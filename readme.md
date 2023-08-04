# Booking request api

It's a project written in `Nest JS` framework at the top of `Node` with `Type Script` support.

Project is a single agnostic microservice that outlines the logic for `BookingRequest` process.

## Business logic

### Flow in few words

As the `client` of the `company` that provides some e.g. medical services, using
`a booking app`, we (and many other `clients`) can `book` an appotiment
with an `expert` in `available` `time range`.

There many aoo users (clients) can book the same `available` date, but only the first
client who approve the `apoptiment` will be allowed to got this meeting with an `expert`.

`Experts` needs to defined them `availability` but it's out of the scope of this service.

**The only responsibility of this APP is handling `BookingRequest`** - creating draft, confirming, canceling.

## Development

This project supports `Makefile`, type `make`:

```text
fast                           Attempts to start existing containers
linting                        Executes linting in the way like CI&CD should do it
linting_fix                    Run linter with --fix flag
start                          Starts containers with build
stop                           Stops containers and removes network
tests                          Executes all tests
tests_unit                     Executes unit tests in the way like CI&CD should do it
tests_unit_watch               Executes unit tests with volume binding and watch mode (needs `tests_unit` command to be executed firstly)
```

### Stack

In order to run this project, it is required to have:

- `Docker` + `docker-compose`,
- Some DDD architecture knowledge,
- Basic `Nest JS`, `Java Script` and `Type Script` knowledge.

### Architecture

This project supports layered architecture, in Domain design in mind - so Domain logic
is the most important part that should be fully `unit tested`.

#### Application layer

Uses command bus in order to change the system state. No returns should be allowed from this type of actions.
