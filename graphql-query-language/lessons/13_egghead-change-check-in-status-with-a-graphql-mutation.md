Instructor: [00:00] We had a lot of fun with the pet, but now it's time to check them back in. We have another named mutation in the schema called `CheckIn`, and this should going to take in the ID of the pet we want to check in.

[00:11] Remember, we need to have our authorization token present in order to do this. Let's check in that same pet that we checked out, `S-2`. The `checkIn` mutation returns an object called `checkout`. Let's figure out what that is.

[00:26] `Checkout` returns a pet, a checkout date, a check-in date, and whether or not the pet is late. There are a bunch of different metadata fields on that type. Let's look at the name of the pet, get the `checkOutDate`, get the `checkInDate`, and whether or not the pet is `late`.

```graphql
mutation CheckIn {
  checkIn(id: "S-2") {
    pet {
      name
    }
    checkOutDate
    checkInDate
    late
  }
}
mutation Checkout {
  checkOut(id: "S-2") {
    pet {
      name
    }
    customer {
      name
    }
  }
}
```

[00:42] When I click play on this, we should see all of those different fields for our pet.

![Checked in mutation shows Switchblade checked in](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/change-check-in-status-with-a-graphql-mutation-check-in-mutation.png)

 Now that we've checked out and checked in a pet, we can look at this data on this query called `allCustomers`. We can query `username`, which should return all of the usernames to us.

```graphql
query {
  allCustomers {
    username
  }
}
```

![All usernames returned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/change-check-in-status-with-a-graphql-mutation-usernames-returned.png)

[00:56] We see my `username` here at the bottom. Then I can also add `checkoutHistory`. Now, `checkoutHistory` is going to return a list of checkouts. That `checkout` object we saw before should have all of the pet details.

```graphql
query {
  allCustomers {
    username
    checkoutHistory {
      pet {
        id
        name
      }
    }
  }
}
```

[01:11] We see the pet details for other folks, and we see `Switchblade` here toward the bottom. For each of them, we can find the name of the pet and the ID.
