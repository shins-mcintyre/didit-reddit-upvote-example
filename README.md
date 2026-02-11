## Upvote

Upvote is a Reddit-esque web application that allows users to create posts, upvote and downvote posts, and comment on posts in a multi-threaded, nested list.

The project is built using Next.js with the /app router and [Tailwind CSS](https://tailwindcss.com/), and uses [Auth.js (formerly Next Auth)](https://authjs.dev/) for user authentication. The data is stored in a Postgres database, which is created and accessed with raw SQL queries using the `pg` package.

The project is a work in progress and is not yet complete.

## Features

- [x] View a list of posts
- [x] View a single post
- [x] Create a post
- [x] Upvote and downvote posts
- [x] Pagination of posts
- [x] Comment on posts
- [x] Nested comments (recursive lists)
- [x] User authentication

## Setup instructions

1. Fork the repository (check "copy the main branch only") and clone your fork to your local machine
2. Run `npm install`
3. Create a `.env.local` file in the root directory and add the following environment variables:
   - `DATABASE_URL` - the URL of your Postgres database (eg. the Supabase connection string)
   - `AUTH_SECRET` - the Next Auth secret string (this can be anything at all like a password, but keep it secret!)
   - `AUTH_GITHUB_ID` - the GitHub OAuth client ID (create yours in [Github developer settings](https://github.com/settings/developers)
   - `AUTH_GITHUB_SECRET` - the GitHub OAuth client secret (create this in [Github developer settings](https://github.com/settings/developers))
4. Create the database schema by running the SQL commands in `schema.sql` in your database (eg. by running the commands in Supabase Query Editor)
5. Run `npm run dev` to start the development server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the site

## Potential future features

- [ ] User profiles
- [ ] Sorting posts by recent (date posted), top (most upvotes), and most controversial (most upvotes _and_ downvotes)
- [ ] User karma scores
- [ ] User badges / trophies (awards for achievements like number of posts, years on the site, etc.)
- [ ] User settings (eg. number of posts per page, theme, etc.)
- [ ] Moderation tools / reporting or flagging objectionable comments for removable by admins
- [ ] Searching posts (possibly using simple SQL LIKE '%some search%', or [Postgres text search](https://www.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database))
- [ ] Subreddits (separate communities, that isn't just one big list of posts, that can be created by users)
- [ ] User notifications
- [ ] User private messaging
- [ ] User blocking
- [ ] User following
- [ ] User feed (posts from users you follow)
- [ ] User flair


## What I did
1. followed setup instructions
2. in SQL votes table 'UNIQUE' line commented out so uncommented it to work
3. set up next auth following video tutorial - login working
4. added env variables to vercel & redeployed
5. tested deployed link and login not working now - it now says the redirect_uri is not associated with this application - searched redirect in project and it seems ok 
6. realised the issue was that in the OAuth the callback url still said localhost (as per video) so created a new OAuth with the vercel deployment link (so I can use either) - left local keys in .env and put production codes in vercel environment variables - redeployed and now it works!
7. Next I want to look through all the code to familiarise myself with what pages/components there are, and then make a start with stretch goals

Stretch goals:
- Fix page titles on post pages to match post titles
I wasn't 100% sure what this meant, as on the post pages the title of the post is right there. So I checked Reddit and I thought maybe it meant the text in the tab, as Reddit has that feature when you click on a post. I assumed this was metadata - I looked at how this was done in the layout and copied it over, adding in code so it used the title entered into the db. I got an error for this initially due to cookies, but then it wasn't too difficult to generate the metadata to get the page title to match the post title.

- Handle the error when you click to vote while not logged in to show a nice error message
Error handler added to Vote (server side - to do the logic of it) and the VoteButton (client side - to give the user a message of why the vote doesn't work)

-Try to make it so I can’t vote more than once
I wanted to try doing this in SQL by setting some parameters so that in the votes table the userid for that particular post is unique - one vote per user per post
I wanted to focus only on post voting (not comment voting as was in SQL) - I realised this was already applied just by what I uncommented in SQL earlier?

- - [ ] Sorting posts by recent (date posted), top (most upvotes), and most controversial (most upvotes _and_ downvotes)
i looked up some ways to do this but content seemed overly complicated. I decided to look back at my week 8 assignment where i implemented sorting for the hike posts. However once I got into that I realised it probably wasn't the best solution because that one links to a new page with asc or desc - but I want this to apply only to the component, so the sorting can be reused wherever the component is reused. I went back to the more complicated method. I created a default order, created a sorting component which allows the user to handle the sort, and imported that into the page