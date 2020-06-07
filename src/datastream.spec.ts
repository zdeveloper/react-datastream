import datastream from "./datastream"

describe('react-datastream', () => {
    const channel = "DATA_STREAM_NAME"

    beforeEach(() => {
        datastream.resetAllStreams()
    })

    it('publishes to a stream', () => {
        datastream.subscribe(channel, (value) => {
            expect(value).toEqual("data-source")
        })

        datastream.publish(channel, "data-source")
    })

    it('replays last published value when subscribing', () => {
        datastream.publish(channel, "data-source")

        datastream.subscribe(channel, (value) => {
            expect(value).toEqual("data-source")
        })
    })

    it('allows to not replay last published value', () => {
        let message = "original message"
        datastream.publish(channel, "newMessage")

        datastream.subscribe(channel, (newMessage) => {
            message = newMessage
        }, false)

        expect(message).toEqual("original message")
    })


    it('allows multiple subs per stream', () => {
        let message1: string
        let message2: string

        datastream.subscribe(channel, value => message1 = value)
        datastream.subscribe(channel, value => message2 = value)

        datastream.publish(channel, "hello world")


        expect(message1).toEqual("hello world")
        expect(message2).toEqual("hello world")
    })


    it('publishs many times to many subscribers', () => {
        let message1: string
        let message2: string

        datastream.subscribe(channel, value => message1 = value)
        datastream.subscribe(channel, value => message2 = value)

        datastream.publish(channel, "bar")
        expect(message1).toEqual("bar")
        expect(message2).toEqual("bar")

        datastream.publish(channel, "be")
        expect(message1).toEqual("be")
        expect(message2).toEqual("be")

        datastream.publish(channel, "cue")
        expect(message1).toEqual("cue")
        expect(message2).toEqual("cue")
    })

    it('publishs to different streams', () => {
        const fooStream = "foofoo"
        const barStream = "barbar"

        datastream.subscribe(fooStream, value => {
            expect(value).toEqual("foo")
        })

        datastream.subscribe(barStream, value => {
            expect(value).toEqual("bar")
        })

        datastream.publish(fooStream, "foo")
        datastream.publish(barStream, "bar")
    })

    it('allows stream callback unsubscription', () => {
        let message: string
        const stream = datastream.subscribe(channel, (newMessage) => {
            message = newMessage
        })

        datastream.publish(channel, "foo")
        expect(message).toEqual("foo")

        stream.unsubscribe()

        datastream.publish(channel, "bar")
        expect(message).toEqual("foo")

    })


    it('allows getting last published value on a stream', () => {
        const stream = datastream.subscribe(channel)

        datastream.publish(channel, "foo")

        expect(stream.getLastValue()).toEqual("foo")
    })


    it('allows resetting all stream subscriptions', () => {
        const fizzStream = "fizz"
        const buzzStream = "buzz"

        let fizz = "fizz"
        let buzz = "buzz"

        datastream.subscribe(fizzStream, value => fizz = value)
        datastream.subscribe(buzzStream, value => buzz = value)

        datastream.resetAllStreams()

        datastream.publish(fizzStream, "FOO")
        datastream.publish(buzzStream, "BAR")

        expect(fizz).toEqual("fizz")
        expect(buzz).toEqual("buzz")
    })
})