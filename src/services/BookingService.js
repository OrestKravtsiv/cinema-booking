const BOOKINGS_KEY = 'bookings';

const BookingService = {
  saveBooking: (movieId, booking) => {
    const allBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || {};
    if (!allBookings[movieId]) {
      allBookings[movieId] = [];
    }
    allBookings[movieId].push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(allBookings));
  },

  getBookedSeats: (movieId) => {
    const allBookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || {};
    const bookingsForMovie = allBookings[movieId] || [];
    return bookingsForMovie.flatMap(b => b.seats);
  }
};

export default BookingService;
