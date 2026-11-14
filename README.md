# BTC Cent Forecast

The entry reads the BTC/USDC minute closes and forecasts the close four hours later. Validation found no nonzero correction that beat persistence on both rolling tune and holdout, so the submitted forecast is the last observed close.

Run locally with Node 22 (input = the kit's `input/` directory holding the practice cases):

```sh
MAKEFUN_INPUT_DIR=<kit>/input MAKEFUN_OUTPUT_DIR=out node main.ts
```

Practice p00-p04 persistence MAE: 47,054.661600 cents (p00 31,711.1420; p01 76,696.7900; p02 47,033.3920; p03 56,684.9760; p04 23,147.0080). The published house score of 44,521.576667 cents covers all six practice cases under the official reference. A sweep of 30 candidates (empirical-median drift, momentum-conditioned median, volatility-scaled median, and their combination) found none that beat persistence on both the rolling tune and holdout splits, so the entry ships persistence.
