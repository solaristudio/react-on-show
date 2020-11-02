## `1.0.1`
- Core build
- Implemented `onShow` and `OnShow`

## `1.0.3`
- Added TypeScript support
- Reconfigured gulpfile

# `2.0.0`
- Re-implemented `onShow` and `OnShow` with powerful features and a neat graphics mechanism.
- Now the function `onShow` has the capability of detecting an element more than once. It has detection for enters and exits in both directions.
- Unit tests has been removed since they are of no use. Planning to implement a new approach for testing.
- test CI has been removed too.
- Currently this default version is on `main` branch.
- For the minimal version `minimal` branch has been created.

## `2.1.0`
- Optimised previous `onShow` function and restructured the main detection algorithm.
- Decreased bundle size drastically using new concise and smart detection algorithm. It is now below 10KB.
- `mergeOnShowOptions` function is removed from the library.
- `getBundleInfo` task added for the `gulpfile.js`.
- `release` folder added to the `.npmignore`.