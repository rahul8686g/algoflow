import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeCustomizer } from '@/components/ThemeCustomizer'
import { ArrowRight, Zap, Code2, LineChart, Cpu, Lock, Check } from 'lucide-react'

export function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-primary selection:text-primary-foreground">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow" />
                <div className="absolute -right-20 top-1/2 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Navbar */}
            <nav className="relative z-10 flex h-20 items-center justify-between px-6 md:px-12 backdrop-blur-sm border-b border-white/5">
                <div className="flex items-center gap-2">
                    {/* Custom Logo Icon */}
                    <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                        <div className="h-4 w-4 bg-black rounded-sm transform rotate-45"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tighter">ALGO <span className="text-primary">FLOW</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeCustomizer />
                    <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all hover:scale-105"
                        onClick={() => navigate('/login')}
                    >
                        Register
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center md:pt-48">
                <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-primary backdrop-blur-xl animate-fade-in">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Next Gen Trading Automation
                </div>

                <h1 className="mb-8 max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl">
                    Automate the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-blue-500 animate-gradient-x">Unseen</span>.
                </h1>

                <p className="mb-12 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed">
                    Break free from traditional charts. Build complex trading algorithms with a visual flow editor that speaks the language of liquidity.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row items-center animate-slide-up">
                    <Button
                        size="lg"
                        className="h-14 bg-white text-black hover:bg-gray-200 text-lg px-8 rounded-full font-bold transition-transform hover:-translate-y-1"
                        onClick={() => navigate('/login')}
                    >
                        Start Building <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 border-white/20 text-white hover:bg-white/10 text-lg px-8 rounded-full backdrop-blur-md"
                        onClick={() => navigate('/login')}
                    >
                        Documentation
                    </Button>
                </div>

                {/* Feature Cards floating */}
                <div className="mt-32 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 px-4">
                    <FeatureCard
                        icon={Zap}
                        title="Visual Logic"
                        desc="Drag, drop, and connect nodes to create sophisticated trading strategies without writing a single line of code."
                        delay="0s"
                    />
                    <FeatureCard
                        icon={Cpu}
                        title="Edge Execution"
                        desc="Lightning fast local execution. Your strategy runs on your machine, keeping your edge private and unseen."
                        delay="0.1s"
                    />
                    <FeatureCard
                        icon={LineChart}
                        title="Live Analytics"
                        desc="Real-time performance monitoring with granular data visualization and execution logs."
                        delay="0.2s"
                    />
                </div>
            </main>


            <div className="relative z-10 container mx-auto px-4 mt-20">
                <div className="grid grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md md:grid-cols-4 text-center shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
                    <MetricItem value="1B+" label="Volume Processed" />
                    <MetricItem value="50ms" label="Avg Latency" />
                    <MetricItem value="99.9%" label="Uptime" />
                    <MetricItem value="10k+" label="Algo Executions" />
                </div>
            </div>

            <section className="relative z-10 container mx-auto px-4 py-24">
                <h2 className="mb-16 text-center text-3xl font-bold md:text-5xl">
                    How <span className="text-primary">AlgoFlow</span> Works
                </h2>
                <div className="grid gap-12 md:grid-cols-3">
                    <StepCard
                        number="01"
                        title="Connect"
                        desc="Securely link your broker account. We support major API-enabled brokers with bank-grade encryption."
                    />
                    <StepCard
                        number="02"
                        title="Design"
                        desc="Use our intuitive drag-and-drop editor to build your strategy. Combine technical indicators, price action, and logic."
                    />
                    <StepCard
                        number="03"
                        title="Deploy"
                        desc="Activate your workflow. Run it locally for maximum privacy or deploy to the cloud for 24/7 uptime."
                    />
                </div>
            </section>

            {/* Pricing Section */}
            <section className="relative z-10 container mx-auto px-4 mb-24">
                <h2 className="mb-16 text-center text-3xl font-bold md:text-5xl">
                    Simple, Transparent <span className="text-primary">Pricing</span>
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <PricingCard
                        title="Starter"
                        price="Free"
                        features={['Basic Strategy Builder', 'Local Execution', '1 Workspace', 'Community Support']}
                    />
                    <PricingCard
                        title="Pro"
                        price="$29"
                        period="/mo"
                        isPopular
                        features={['Advanced Nodes', 'Cloud Execution', 'Unlimited Workspaces', 'Priority Support', 'Live Data Feed']}
                    />
                    <PricingCard
                        title="Institutional"
                        price="$99"
                        period="/mo"
                        features={['Custom API Integration', 'Dedicated Server', 'White Label', '24/7 Phone Support', 'SLA Guarantee']}
                    />
                </div>
            </section>

            <section className="relative z-10 mb-20 container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-primary/20 p-12 text-center md:p-24">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10">
                        <h2 className="mb-6 text-3xl font-bold md:text-5xl">Ready to Automate Your Edge?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                            Join the community of algorithmic traders who are taking back control of their execution.
                        </p>
                        <Button
                            size="lg"
                            className="h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 rounded-full shadow-[0_0_40px_rgba(var(--primary),0.6)] hover:shadow-[0_0_60px_rgba(var(--primary),0.8)] transition-all"
                            onClick={() => navigate('/login')}
                        >
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/50 py-12 backdrop-blur-lg">
                <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
                    <p className="text-gray-500 text-sm">Build by Abhishek Technology Pvt Ltd</p>
                    <div className="flex gap-6 text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: string }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.2)]"
            style={{ animationDelay: delay }}
        >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{desc}</p>
        </div>
    )
}


function MetricItem({ value, label }: { value: string, label: string }) {
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''))
    const suffix = value.replace(/[0-9.]/g, '')
    const animatedValue = useCountUp(numericPart, 2000)

    return (
        <div>
            <div className="text-3xl font-bold text-white md:text-4xl">
                {animatedValue}{suffix}
            </div>
            <div className="mt-1 text-sm text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
    )
}

function useCountUp(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number | null = null
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = currentTime - startTime
            const percentage = Math.min(progress / duration, 1)

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4)

            setCount(parseFloat((end * ease).toFixed(1)))

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return count
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative border-l border-white/10 pl-8 transition-colors hover:border-primary">
            <div className="mb-4 text-5xl font-bold text-white/5">{number}</div>
            <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function PricingCard({ title, price, period, features, isPopular }: { title: string, price: string, period?: string, features: string[], isPopular?: boolean }) {
    return (
        <div className={`relative rounded-2xl border p-8 backdrop-blur-sm transition-all hover:scale-105 ${isPopular ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.2)]' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground shadow-lg">
                    Most Popular
                </div>
            )}
            <h3 className="mb-2 text-xl font-medium text-gray-400">{title}</h3>
            <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold text-white">{price}</span>
                {period && <span className="ml-1 text-gray-500">{period}</span>}
            </div>
            <ul className="mb-8 space-y-4">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Button className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20'}`}>
                Get Started
            </Button>
        </div>
    )
}
