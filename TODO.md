# Todo:

- if session data or rate limiting counters hit performace, add secondary storage w/ redis
https://www.better-auth.com/docs/concepts/database#secondary-storage

- for data fetching, create hydration boundaries (second code block is app router)
https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data


### Profile

- username - unique
- first name
- last name
- location
- profile pic - profile image editor
- header image
- bio
- links - with icons


## NEXT

### Create user data table in DB
- add user data relationship with ID on auth user table
- create user data table with profile info

### Upload profile and header images
- User select, crop, preview image from file input
- Upload file to UT, attach url to user data object in DB
