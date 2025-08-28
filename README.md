# pco-api

> a TypeScript library for the [planning center](https://planningcenter.com) [API](https://developer.planning.center/docs)

[![JSR](https://jsr.io/badges/@svecs132/pco-api)](https://jsr.io/@svecs132/pco-api)

> [!WARNING]
> this library is a **work in progress** and is not yet ready for production use

## usage

```shell
# if using bun
bunx jsr add @svecs132/pco-api

# if using npm
npx jsr add @svecs132/pco-api

# if using yarn
yarn add jsr:@svecs132/pco-api
```

```typescript
import ServicesClient from "@svecs132/pco-api/services";

const client = new ServicesClient({
  appId: "APP ID HERE",
  secret: "SECRET HERE",
});

client.getPeople().then((people) => {
  console.log(people.join("\n"));
});
```

## features

> [!NOTE]
> so far only focusing on the Services API but will expand to other parts in the future

- [x] browse folders and service types
- [x] get items of a plan
- [ ] get each item's
  - [x] planned length
  - [ ] recorded length
  - [ ] recorded start time
- [ ] get the current timer if you want
  - [ ] full item length
  - [ ] to end item on time
- [ ] live control
  - [ ] take/release control
  - [ ] restart / jump to end of plan
  - [ ] next/previous item
  - [ ] jump to item by id
