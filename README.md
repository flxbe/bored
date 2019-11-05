# `bored`: A Data Modeling Language

Language to describe the structure of your data, similar to [protobuf].
This should be a basis to generate database migrations as well as code.

## Progress

### current

### todo

- generate attribute validations
- auto-generate model tests
- generate relations

### done

- generate optional attributes
- change generator to typescript
- change project to typescript
- build basic user service
- generate simple model from `json` definition

### ideas

- generate model constructor (needs another ORM or better type support)
- add value object semantics (needs another ORM)

## Possible Syntax

The core syntax should be minimal and only support the definition of the
data structures.
Any additional information used by generators should be
added via annotations.

```
struct User {
  string username;
  string password;
  optional string email;

  optional string description = "The default description";
}
```

Every attribute should be required by default.

## Code Generation

Since `bored` should be independent from any language or code pattern,
there might be additional information needed for a specific code generator.

This should be solved via annotations.

```
@actions[login, register]
struct User {
  string username;

  @hashed
  string password;

  @email
  optional string email;

  @phonenumber;
  optional string phonenumber;

  @iban
  optional string iban;
}
```

[protobuf]: https://developers.google.com/protocol-buffers/
