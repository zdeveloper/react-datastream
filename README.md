# React-DataStream

react-datastream is an easy way for your components to talk to each other. It will make your "Prop Drilling" a thing of the past.

* Easy to use and integrate
* No boilerplate
* Minimal react code changes
* Magic

# How it works!

react-datastream uses streams with a pub/sub model, any component can publish to the stream and any component can subscribe to a stream. any to any relationship.

### Installation

```sh
$ npm install react-datastream
```

### Usage

Import it in your code

```javascript
import datastream from "react-datastream";
```

declare a shared stream name

```javascript
const STREAM_NAME = "DATA_STREAM"
```


publish changes

```javascript
datastream.publish(STREAM_NAME, value);
```

listen for changes

```javascript
datastream.subscribe(STREAM_NAME, (value) => {console.log(value)});
```


Dont forget to unsubscribe to prevent orphaned callbacks

```typescript
stream: Stream;

componentDidMount() {
  this.stream = datastream.subscribe(STREAM_NAME, value => console.log(value));
}

componentWillUnmount() {
  this.stream.unsubscribe()
}
```


**Cheers!**
