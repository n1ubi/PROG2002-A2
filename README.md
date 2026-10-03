# Charity Events Website — PROG2002 A2

A full-stack charity events website built for the PROG2002 Assignment 2 (Part 1 & Part 2). The site lets users browse fundraising events around Liuzhou, search them by date, district and category, and view full details of each event.
This project has undergone multiple revisions and has been released in four versions. The latest version shall be taken as the standard.

## Features

- **Home page** — hero banner introducing the organisation, with events grouped into Ongoing, Upcoming and Completed sections. Each event card shows a photo, category tag and a live progress bar.
- **Search page** — filter events by date (validated as `YYYY-MM-DD`), district and category. Clear status messages are shown when no filter is selected, when no results match, or when the API request fails.
- **Event detail page** — full information for a selected event: venue photo, description, goal amount, organiser and a status-coloured progress bar. The register button is heart-red with a heart icon, and turns grey with "Event Completed" for finished events.
- RESTful API built with Node.js and Express, backed by a MySQL database with parameterised queries (SQL-injection safe).

## Tech Stack

- **Backend:** Node.js, Express 5, MySQL (mysql2)
- **Frontend:** plain HTML, CSS and vanilla JavaScript (no frameworks)
- **Database:** MySQL — `charityevents_db` with three tables: `organisations`, `categories`, `events`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List all events. Optional query params: `date` (`YYYY-MM-DD`), `location` (venue or district keyword), `category` (category id) |
| GET | `/api/events/:id` | Full details of a single event (404 if not found) |
| GET | `/api/categories` | All event categories, used by the search form dropdown |

Each event response includes: `event_id`, `event_name`, `event_description`, `event_date`, `event_time`, `location`, `district`, `goal_amount`, `progress_percent`, `ticket_price`, `image_url`, `category_name`, `org_name` and a computed `status` (`past` / `upcoming`).

## Notes

- The event images live in `client/images/` and are served to the browser through the `image_url` field returned by the API.
- The `status` of an event is computed on the server from its date, so Ongoing/Upcoming/Completed sections update automatically as time passes.
