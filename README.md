This is a Next.js project for the blog api admin panel. Blog post authors and site admins can to login here. 
Other users should log in at the basic page. Authors can only see posts that they write, admins can see posts from 
everyone. There's no pagination for now. If there's interest, I can easily integrate it. <br><br>

Updated support to work with the `TinyMCE` rich-text-editor for creating and editing posts. `Supabase` storage is used 
to persist uploaded images, and TinyMCE supports image external links by default. HTML posts are directly injected as 
innerHTML in react which is typically unsafe, however, `DOMPurify` is used to sanitize the html, allowing only specific 
html tags and attributes to be saved in the db. <br>

The text and images can be styled as desired within the rich-text-editor, and allowing for simple html styles like code, 
superscript, subscript, centered text etc.

## Getting Started
First install packages with `npm install`, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:1900) with your browser to see the result.


### Content Management System (CMS) Routes 
These are the routes implemented with react. They're different from the api calls made to the express server where 
the backend logic resides

| Route | Actions |
| :---- | :------ |
| `/` | Landing page |
| `/signup` | Signup |
| `/signin` | Login |
| `/create` | Create a new post. No comment view |
| `/dashboard` | Page to show all the thumbnails for blogs the user has written |
| `/dashboard/:id` | Unique page to view extended version of a blog post. You can also view existing comments |
| `/dashboard/:id/edit` | Edit an existing post here. Add new text, change the title, publish/unpublish etc. |

> [!Note]
> Comments are much shorter than posts, so it didn't make sense to create a dedicated page for them. All comment modifications, 
    create/edit/delete are handled on the `/dashboard/:id` page using interactive functionality from react.

### Permissions
- Admins can delete any post/comment but cannot edit files that they didn't create. Can be useful for moderating malicious 
    posts/comments.
- Blog post authors and Admins can edit only comments that they created.  
- Users don't have access to this content management system.


### Navbar Setup
- When logged out `| Home  | Sign In | Sign Up |`.
- When logged In `| Home | Dashboard | Create Post | Logout |`. Landing page will be My Posts


### Environment Variables
```bash
NEXT_PUBLIC_EXPRESSURL="..."
NEXT_PUBLIC_CMSURL="..."
NEXT_PUBLIC_GUEST_PSWD="..."
NEXT_PUBLIC_TINYMCE_API="..."
NEXT_PUBLIC_SUPABASE_BUCKET="..."
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON="..."
```