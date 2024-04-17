fn main() {
    use rdev::{listen, Event};

    // <== This will block.
    if let Err(error) = listen(callback) {
        println!("Error: {:?}", error)
    }

    fn callback(event: Event) {
        // <== This is the callback function
        println!("My callback {:?}", event);
        match event.name {
            // <== This is the event name
            Some(string) => println!("User wrote {:?}", string), // <== This is the event value
            None => (),
        }
    }
}
