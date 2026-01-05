from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.date import DateTrigger
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class WorkflowScheduler:
    _instance: Optional["WorkflowScheduler"] = None
    _scheduler: Optional[AsyncIOScheduler] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def init(self, db_url: str = "sqlite:///./algoflow.db"):
        if self._scheduler is None:
            jobstores = {
                "default": SQLAlchemyJobStore(url=db_url)
            }
            self._scheduler = AsyncIOScheduler(jobstores=jobstores)
            self._scheduler.start()
            logger.info("Scheduler started")

    @property
    def scheduler(self) -> AsyncIOScheduler:
        if self._scheduler is None:
            raise RuntimeError("Scheduler not initialized. Call init() first.")
        return self._scheduler

    def add_workflow_job(
        self,
        workflow_id: int,
        schedule_type: str,
        time_str: str = "09:15",
        days: Optional[list[int]] = None,
        execute_at: Optional[str] = None,
        interval_value: Optional[int] = None,
        interval_unit: Optional[str] = None,
        func=None
    ) -> str:
        """Add a workflow job to the scheduler

        Args:
            workflow_id: ID of the workflow
            schedule_type: 'once', 'daily', 'weekly', or 'interval'
            time_str: Time string in HH:MM format (for daily/weekly/once)
            days: List of days for weekly schedule (0=Mon, 6=Sun)
            execute_at: ISO datetime string for one-time execution
            interval_value: Interval value (e.g., 1, 5, 10)
            interval_unit: Interval unit ('seconds', 'minutes', 'hours')
            func: Function to execute
        """
        job_id = f"workflow_{workflow_id}"

        # Remove existing job if any
        self.remove_job(job_id)

        if schedule_type == "interval":
            # Interval execution
            value = interval_value or 1
            unit = interval_unit or "minutes"

            if unit == "seconds":
                trigger = IntervalTrigger(seconds=value)
            elif unit == "hours":
                trigger = IntervalTrigger(hours=value)
            else:  # minutes (default)
                trigger = IntervalTrigger(minutes=value)

            logger.info(f"Creating interval trigger: every {value} {unit}")

        elif schedule_type == "once" and execute_at:
            # One-time execution
            execute_datetime = datetime.fromisoformat(execute_at.replace("Z", "+00:00"))
            trigger = DateTrigger(run_date=execute_datetime)

        elif schedule_type == "daily":
            # Daily execution
            hour, minute = map(int, time_str.split(":"))
            trigger = CronTrigger(hour=hour, minute=minute)

        elif schedule_type == "weekly" and days:
            # Weekly execution on specific days
            hour, minute = map(int, time_str.split(":"))
            day_names = {0: "mon", 1: "tue", 2: "wed", 3: "thu", 4: "fri", 5: "sat", 6: "sun"}
            day_of_week = ",".join(day_names[d] for d in days)
            trigger = CronTrigger(day_of_week=day_of_week, hour=hour, minute=minute)

        else:
            raise ValueError(f"Invalid schedule configuration: type={schedule_type}")

        self.scheduler.add_job(
            func,
            trigger=trigger,
            id=job_id,
            args=[workflow_id],
            replace_existing=True
        )

        logger.info(f"Added job {job_id} with trigger {trigger}")
        return job_id

    def remove_job(self, job_id: str) -> bool:
        """Remove a job from the scheduler"""
        try:
            self.scheduler.remove_job(job_id)
            logger.info(f"Removed job {job_id}")
            return True
        except Exception:
            return False

    def get_job(self, job_id: str):
        """Get a job by ID"""
        return self.scheduler.get_job(job_id)

    def get_next_run_time(self, job_id: str) -> Optional[datetime]:
        """Get the next run time for a job"""
        job = self.get_job(job_id)
        if job:
            return job.next_run_time
        return None

    def shutdown(self):
        """Shutdown the scheduler"""
        if self._scheduler:
            self._scheduler.shutdown()
            logger.info("Scheduler shutdown")


# Global scheduler instance
workflow_scheduler = WorkflowScheduler()
