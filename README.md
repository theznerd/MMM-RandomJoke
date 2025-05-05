# MMM-RandomJoke

A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that displays random jokes from the official-joke-api.

## Screenshot
![Screenshot of the MMM-RandomJoke module](https://via.placeholder.com/400x200?text=MMM-RandomJoke+Screenshot)

## Installation

1. Navigate to your MagicMirror's modules folder:
```bash
cd ~/MagicMirror/modules/
```

2. Clone this repository:
```bash
git clone https://github.com/yourusername/MMM-RandomJoke.git
```

3. Install dependencies:
```bash
cd MMM-RandomJoke
npm install
```

4. Add the module to your `config/config.js` file:
```javascript
{
    module: "MMM-RandomJoke",
    position: "lower_third", // Choose any available position
    config: {
        // See 'Configuration options' below
    }
}
```

## Configuration Options

| Option | Description | Default |
| ------ | ----------- | ------- |
| `updateInterval` | How often to fetch a new joke (in milliseconds) | `900000` (15 minutes) |
| `fadeSpeed` | Speed of fade animation (in milliseconds) | `4000` |
| `retryDelay` | Delay before retrying if API request fails (in milliseconds) | `5000` |
| `animationSpeed` | Speed of UI update animation (in milliseconds) | `2500` |
| `showType` | Whether to show the joke category/type | `true` |
| `showId` | Whether to show the joke ID | `false` |

## Example Configuration

```javascript
{
    module: "MMM-RandomJoke",
    position: "bottom_bar",
    config: {
        updateInterval: 600000, // New joke every 10 minutes
        showType: true,
        showId: true
    }
}
```

## Dependencies
- [node-fetch](https://www.npmjs.com/package/node-fetch) - Used for API requests

## API Credit
This module uses the [Official Joke API](https://github.com/15Dkatz/official_joke_api) to fetch random jokes.

## License
MIT
