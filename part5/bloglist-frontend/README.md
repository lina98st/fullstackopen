# Blog App – Full Stack Open

This project is part of the [Full Stack Open](https://fullstackopen.com/en/) course.

## Progress

✅ Up to exercise **5.17** implemented:

- User login with token authentication
- Blog list:
  - Shows title, author, URL, likes, and blog creator
  - Blogs are sorted by number of likes (descending)
  - Like button works (updates likes immediately)
  - Delete button shown **only to the user who created the blog**
- Create new blogs
- Token is saved to `localStorage` and used in all API requests
- Backend checks permissions when deleting blogs
- End-to-end tests with Playwright added:
  - Login form is shown by default
  - Login succeeds and fails tested
  - Creating a new blog tested
  - Liking a blog tested

## Running the App

### Frontend

```bash
npm install
npm run dev
API Endpoints
GET /api/blogs

POST /api/blogs – requires token

PUT /api/blogs/:id – for liking a blog

DELETE /api/blogs/:id – only allowed by the blog creator

Testing
End-to-end tests are located in a separate project folder bloglist-e2e-tests and use Playwright.

To run tests:
 
cd bloglist-e2e-tests
npm install
npx playwright test
Make sure your backend and frontend servers are running before executing the tests.


