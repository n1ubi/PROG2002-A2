/*
 * index.js
 * Home page: fetches events from the API and renders the upcoming ones.
*/

const API_BASE = 'http://localhost:3000/api';

// Load events from the API and render the cards
async function loadEvents() {
  const container = document.getElementById('event-list');

  try {
    // 1. Send the GET request to the API (a Promise)
    const response = await fetch(API_BASE + '/events');

    // 2. Check the response status
    if (!response.ok) {
      throw new Error('Server returned ' + response.status);
    }

    // 3. Parse the JSON from the response body
    const events = await response.json();

    // 4. Only show events that are not in the past
    const upcoming = events.filter(function (e) {
      return e.status !== 'past';
    });

    // 5. Render the list into the DOM
    renderEvents(upcoming);
  } catch (err) {
    // 6. Show an error message to the user
    container.innerHTML =
      '<div class="error-box">Sorry, we could not load the events. ' +
      'Please make sure the API server is running. (' + err.message + ')</div>';
  }
}

// Build one card per event
function renderEvents(events) {
  const container = document.getElementById('event-list');

  if (events.length === 0) {
    container.innerHTML = '<p class="info-box">No upcoming events right now. Check back soon!</p>';
    return;
  }

  let html = '';
  events.forEach(function (e) {
    html += `
      <article class="event-card">
        <span class="category-tag">${escapeHtml(e.category_name)}</span>
        <h3>${escapeHtml(e.event_name)}</h3>
        <p class="meta">📅 ${e.event_date} ${e.event_time ? 'at ' + e.event_time.slice(0, 5) : ''}</p>
        <p class="meta">📍 ${escapeHtml(e.location)}, ${escapeHtml(e.district)}</p>
        <p class="meta">Hosted by ${escapeHtml(e.org_name)}</p>
        <p class="price">${e.ticket_price == 0 ? 'Free entry' : '$' + e.ticket_price}</p>
        <a class="btn" href="event.html?id=${e.event_id}">View Details</a>
      </article>
    `;
  });

  container.innerHTML = html;
}

// Prevent XSS when inserting API data into the page
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Run when the page loads
loadEvents();
