use std::env;

fn main() {
    // Collect the command-line arguments into a vector
    let args: Vec<String> = env::args().collect();

    // Print the arguments
    for (index, arg) in args.iter().enumerate() {
        println!("Argument {}: {}", index, arg);
    }
}

