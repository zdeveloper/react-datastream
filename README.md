# React-Xedd

React-Xedd is the dead simple state-manager-ish that will make your "Prop Drilling" a thing of the past.

* Easy to use and integrate
* No boilerplate
* minimal react code changes
* Magic

# How it works!

React-Xedd used streams with a pub/sub model, any component can publish to the stream and any component can subscribe to a stream.

### Installation

```sh
$ npm install react-xedd
```

Then import it in your code

```javascript
import xedd from "xedd";
```

publish changes

```javascript
xedd.publish(<STREAM_NAME>, value);
```

listen for changes

```javascript
xedd.subscribe(<STREAM_NAME>, callback);
```

**Cheers!**
