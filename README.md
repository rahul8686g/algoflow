# AlgoFlow

A visual workflow editor for trading automation with broker API integration. Build complex trading workflows with a drag-and-drop interface similar to n8n.

## Features

- Visual workflow editor with ReactFlow
- 50+ node types for comprehensive trading automation
- Options trading with multi-leg strategies (Iron Condor, Straddle, Strangle, Spreads)
- Smart position-aware ordering for risk management
- Schedule-based and real-time WebSocket triggers
- Multi-step conditional branching and logic gates
- Comprehensive variable system for data orchestration
- Real-time data streaming and WebSocket subscriptions
- Built-in SQLite database (zero configuration)
- Premium dark-mode interface optimized for traders

## Prerequisites

- Python 3.11+
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (auto-installed by setup script)
- Broker API running locally or remotely

## Quick Start

### Windows

1. Run setup (installs uv if needed):
```cmd
setup.bat
```

2. Start the application:
```cmd
start.bat
```

### Linux/Mac

1. Run setup:
```bash
chmod +x setup.sh start.sh
./setup.sh
```

2. Start the application:
```bash
./start.sh
```

## Running Separately

### Backend

```bash
cd backend
uv run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

## First Time Setup

### Backend Setup

```bash
cd backend
cp .env.example .env    # Copy environment template
uv sync                 # Install dependencies
uv run migration/migrate_all.py  # Run database migrations
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Configuration

1. Open http://localhost:5173
2. Go to Settings
3. Enter your broker API credentials:
   - **API Key**: Your broker API key
   - **Host URL**: Broker REST API URL (default: http://127.0.0.1:5000)
   - **WebSocket URL**: WebSocket URL for live data (default: ws://127.0.0.1:8765)
4. Click "Test Connection" to verify
5. Save settings

## Creating Workflows

1. Click "New Workflow" on the Dashboard
2. Drag nodes from the left panel to the canvas
3. Connect nodes by dragging from one handle to another
4. Configure each node by clicking on it
5. Save the workflow
6. Click "Activate" to start the schedule

## Node Types

### Triggers

| Node | Description |
|------|-------------|
| Schedule | Start workflow at specified time (once/daily/weekly/interval) |
| Price Alert | Real-time WebSocket monitoring - triggers when price condition is met |
| Webhook | External HTTP trigger with secret authentication |

### Price Alert Conditions

| Condition | Description |
|-----------|-------------|
| Greater Than | LTP > target price |
| Less Than | LTP < target price |
| Crossing | Price crosses the target (either direction) |
| Crossing Up | Price crosses above target |
| Crossing Down | Price crosses below target |
| Entering Channel | Price enters a price range |
| Exiting Channel | Price exits a price range |
| Moving Up % | Price moved up by X% |
| Moving Down % | Price moved down by X% |

### Actions - Orders

| Node | Description |
|------|-------------|
| Place Order | Place a basic trading order |
| Smart Order | Position-aware ordering that synchronizes your account with a target position size. Automatically calculates the delta quantity needed. |
| Options Order | ATM/ITM/OTM options with expiry selection |
| Multi-Leg | Options strategies (Straddle, Strangle, Iron Condor, Spreads) |
| Basket Order | Execute multiple orders at once |
| Split Order | Split large orders into smaller chunks |
| Modify Order | Modify an existing order |
| Cancel Order | Cancel a specific order by ID |
| Cancel All | Cancel all open orders |
| Close Positions | Square off all positions |

### Options Expiry Types

| Type | Description |
|------|-------------|
| Current Week | Nearest weekly expiry |
| Next Week | Second weekly expiry |
| Current Month | Last expiry of current month |
| Next Month | Last expiry of next month |

### Options Strategies (Multi-Leg)

| Strategy | Description |
|----------|-------------|
| Straddle | ATM CE + ATM PE (same strike) |
| Strangle | OTM CE + OTM PE (different strikes) |
| Iron Condor | 4-leg neutral strategy |
| Bull Call Spread | Buy ATM CE, Sell OTM CE |
| Bear Put Spread | Buy ATM PE, Sell OTM PE |

### Conditions

| Node | Description |
|------|-------------|
| Position Check | Check if position exists or quantity threshold |
| Fund Check | Verify available margin |
| Price Condition | Compare price against threshold (LTP, High, Low, etc.) |
| Time Window | Check if current time is within a specific range (Market hours) |
| Time Condition | Trigger specifically at, before, or after a target time |
| Greeks Check | Monitor option greeks (Delta, Gamma, Theta, Vega, IV) |

### Logic Gates

| Node | Description |
|------|-------------|
| AND Gate | Triggers only if ALL connected conditions are true |
| OR Gate | Triggers if ANY connected condition is true |
| NOT Gate | Inverts the condition (True -> False, False -> True) |

### Data Nodes

| Node | Description |
|------|-------------|
| Get Quote | Fetch real-time quote (LTP, OHLC, volume) |
| Get Depth | 5-level bid/ask market depth |
| Order Status | Check status of a specific order |
| Open Position | Get current position details |
| History | Fetch OHLCV historical data |
| Expiry Dates | Get F&O expiry dates |
| Multi Quotes | Fetch quotes for multiple symbols at once |
| Symbol Info | Get instrument details (lot size, tick size, expiry) |
| Option Symbol | Resolve option symbol from underlying, expiry, and strike |
| Order Book | Fetch all current orders and their status |
| Trade Book | List all executed trades |
| Position Book | View all current open and closed positions |
| Synthetic Future | Calculate synthetic future price from options |
| Option Chain | Fetch full option chain with ATM strike identification |
| Market Holidays | Get list of upcoming exchange holidays |
| Market Timings | Get session timings for different exchanges |

### Utilities

| Node | Description |
|------|-------------|
| Variable | Store and manipulate values |
| Log | Debug logging with levels (info/warn/error) |
| Telegram | Send alerts via Telegram |
| Delay | Wait for specified duration |
| Wait Until | Pause workflow until a specific clock time |
| Math Expression | Evaluate complex math (e.g., `({{ltp}} * {{qty}}) + 0.01`) |
| HTTP Request | Make external API calls (GET, POST, etc.) |
| Group | Organize nodes visually |

### WebSocket Streaming

| Node | Description |
|------|-------------|
| Subscribe LTP | Real-time last traded price stream |
| Subscribe Quote | Real-time OHLCV and market data stream |
| Subscribe Depth | Real-time 5-level market depth stream |
| Unsubscribe | Stop active data streams |

### Risk Management

| Node | Description |
|------|-------------|
| Holdings | List all equity portfolio holdings |
| Funds | View available margin, cash, and collateral |
| Margin Calc | Check required margin for a set of positions |

## Variable System

Use variables to pass data between nodes:

- Set variables with the Variable node
- Reference variables using `{{variableName}}` syntax
- Access nested properties: `{{quote.ltp}}`, `{{position.quantity}}`
- System variables: `{{timestamp}}`, `{{date}}`, `{{time}}`

## Supported Exchanges

- NSE (Equity)
- NFO (F&O)
- BSE (Equity)
- BFO (F&O)
- CDS (Currency)
- BCD (Currency)
- MCX (Commodity)
- NCDEX (Commodity)
- NSE_INDEX
- BSE_INDEX

## Supported Underlying Symbols

### NSE Index Symbols (F&O Exchange: NFO)

| Symbol | Lot Size |
|--------|----------|
| NIFTY | 75 |
| BANKNIFTY | 30 |
| FINNIFTY | 65 |
| MIDCPNIFTY | 120 |
| NIFTYNXT50 | 25 |

### BSE Index Symbols (F&O Exchange: BFO)

| Symbol | Lot Size |
|--------|----------|
| SENSEX | 20 |
| BANKEX | 30 |
| SENSEX50 | 25 |

## Order Types

| Type | Description |
|------|-------------|
| MARKET | Execute at market price |
| LIMIT | Execute at specified price |
| SL | Stop Loss with limit |
| SL-M | Stop Loss at market |

## Product Types

| Type | Description |
|------|-------------|
| MIS | Intraday (auto square-off) |
| CNC | Cash & Carry (delivery) |
| NRML | Normal (F&O) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/settings | Get settings |
| PUT | /api/settings | Update settings |
| POST | /api/settings/test | Test connection |
| GET | /api/workflows | List workflows |
| POST | /api/workflows | Create workflow |
| GET | /api/workflows/{id} | Get workflow |
| PUT | /api/workflows/{id} | Update workflow |
| DELETE | /api/workflows/{id} | Delete workflow |
| POST | /api/workflows/{id}/activate | Activate |
| POST | /api/workflows/{id}/deactivate | Deactivate |
| POST | /api/workflows/{id}/execute | Run now |
| GET | /api/workflows/{id}/webhook | Get webhook info |
| POST | /api/workflows/{id}/webhook/enable | Enable webhook |
| POST | /api/workflows/{id}/webhook/disable | Disable webhook |
| POST | /api/workflows/{id}/webhook/regenerate | Regenerate URL & secret |
| POST | /api/webhook/{token} | Trigger workflow via webhook |
| POST | /api/webhook/{token}/{symbol} | Trigger with symbol in URL |

## Environment Configuration

Create `backend/.env` file:

```bash
cd backend
cp .env.example .env
```

Then edit the `.env` file:

```env
# Debug mode (default: false)
DEBUG=false

# Server configuration
HOST=127.0.0.1
PORT=8000

# Database URL
DATABASE_URL=sqlite+aiosqlite:///./algoflow.db

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Webhook host URL (for generating webhook URLs)
# Set this to your public URL when deploying
WEBHOOK_HOST_URL=http://127.0.0.1:8000
```

## Database Migrations

When updating the database schema, run migrations:

```bash
cd backend
uv run migration/migrate_all.py
```

## Webhook Trigger

AlgoFlow supports external webhook triggers, allowing you to trigger workflows from TradingView, Chartink, custom scripts, or any HTTP client.

### How It Works

1. Each workflow has a unique **Webhook URL** and **Webhook Secret**
2. External systems send a POST request with JSON payload
3. The secret is validated before execution (supports two auth methods)
4. Payload data is available as `{{webhook.*}}` variables

### Authentication Methods

AlgoFlow supports two authentication methods to accommodate different services:

| Method | Use Case | How It Works |
|--------|----------|--------------|
| **Secret in Payload** | TradingView, custom scripts | Include `"secret": "your_secret"` in JSON body |
| **Secret in URL** | Chartink, fixed-format services | Append `?secret=your_secret` to webhook URL |

Configure the authentication method from Dashboard > Workflow Menu > Webhook.

### Webhook URL Formats

```
# Generic webhook (secret in payload)
POST https://your-host/api/webhook/{token}

# With secret in URL (for Chartink, etc.)
POST https://your-host/api/webhook/{token}?secret=your_secret

# With symbol in URL
POST https://your-host/api/webhook/{token}/{symbol}
POST https://your-host/api/webhook/{token}/{symbol}?secret=your_secret
```

### Accessing Webhook Data

| Variable | Description |
|----------|-------------|
| `{{webhook.symbol}}` | Symbol from URL or payload |
| `{{webhook.action}}` | Action (BUY/SELL) |
| `{{webhook.price}}` | Price from payload |
| `{{webhook.quantity}}` | Quantity from payload |
| `{{webhook.stocks}}` | Stocks from Chartink payload |
| `{{webhook.trigger_prices}}` | Trigger prices from Chartink |
| `{{webhook.scan_name}}` | Scan name from Chartink |
| `{{webhook.custom_field}}` | Any custom field you send |

### Managing Webhooks

**From Dashboard:**
1. Click the menu (⋮) on any workflow card
2. Select "Webhook"
3. Enable webhook and choose authentication method
4. Copy URL & secret

**From Editor:**
1. Add a "Webhook Trigger" node
2. URL and secret are displayed in the config panel
3. Set symbol for dynamic URL generation

### Example: TradingView Alert

1. Create workflow with Webhook Trigger node
2. Enable webhook from Dashboard (use "Secret in Payload" auth)
3. In TradingView, create alert with webhook URL
4. Set message body:

```json
{
  "secret": "your_secret",
  "symbol": "{{ticker}}",
  "action": "{{strategy.order.action}}",
  "price": {{close}},
  "quantity": 10
}
```

### Example: Chartink Scanner

1. Create workflow with Webhook Trigger node
2. Enable webhook from Dashboard (use "Secret in URL" auth)
3. Copy the "Webhook URL (with secret)" - includes `?secret=...`
4. In Chartink, set the webhook URL with the secret query parameter

Chartink sends payloads in this format (cannot be modified):
```json
{
  "stocks": "RELIANCE,INFY,TCS",
  "trigger_prices": "2500.50,1800.25,3500.00",
  "triggered_at": "9:30 am",
  "scan_name": "My Scanner",
  "scan_url": "my-scanner",
  "alert_name": "Buy Alert"
}
```

Access data in workflow using `{{webhook.stocks}}`, `{{webhook.scan_name}}`, etc.

### Security

- Each workflow has unique token (URL) and secret
- Secret is validated on every request
- Two auth methods: payload-based or URL-based
- Failed auth returns 401 Unauthorized
- Rate limit: 30 requests/minute per endpoint

## Price Alert Trigger

AlgoFlow supports real-time price monitoring using WebSocket streaming.

### How It Works

1. Add a **Price Alert** trigger node to your workflow
2. Configure the symbol, exchange, and price condition
3. **Activate** the workflow to start real-time monitoring
4. When the price condition is met, the workflow triggers automatically

### Features

- **Real-time Monitoring**: Uses WebSocket for instant price updates (not polling)
- **Multiple Conditions**: Support for various price conditions (crossing, channels, percentages)
- **One-shot Trigger**: Workflow triggers once when condition is met, then deactivates
- **Multiple Alerts**: Monitor multiple symbols across different workflows simultaneously

### Example Use Cases

1. **Breakout Alert**: Trigger when NIFTY crosses above 26000
2. **Stop Loss**: Execute sell order when price drops below threshold
3. **Range Trading**: Alert when price enters or exits a channel
4. **Momentum**: Detect when price moves up/down by X%

### Accessing Price Data

When a price alert triggers, the following variables are available:

| Variable | Description |
|----------|-------------|
| `{{webhook.trigger_type}}` | Always "price_alert" |
| `{{webhook.trigger_price}}` | The price that triggered the alert |
| `{{webhook.triggered_at}}` | Timestamp when alert triggered |

### API Endpoint

Check active price monitors:
```
GET /api/workflows/price-monitor/status
```

## Tech Stack

- **Frontend**: React, ReactFlow, shadcn/ui, TailwindCSS, Zustand
- **Backend**: FastAPI, SQLAlchemy, APScheduler
- **Database**: SQLite
- **Integration**: Broker API SDK

## Security Notes

- API keys are stored in the local SQLite database
- Run on localhost for development only
- Do not expose to public internet without proper authentication

## License

AGPL V3
