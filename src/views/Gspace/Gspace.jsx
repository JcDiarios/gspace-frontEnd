import { useState } from 'react';
import axios from 'axios';
import Pic1 from '/src/assets/images/arcadebook.jpeg';
import Pic2 from '/src/assets/images/consolebook.jpeg';
import Pic3 from '/src/assets/images/pcbook.jpeg';

const RoomDetails = {
  arcade: {
    image: Pic1,
    description: 'Welcome to the Nexus of Nostalgia, the Arcade Room! Immerse yourself in a symphony of electronic symphonies and pixelated dreams...',
    price: '₱1,000 ',
  },
  console: {
    image: Pic2,
    description: "Welcome to the Console Citadel, where pixels meet power! Immerse yourself in the sleek aesthetics and high-tech prowess of gaming consoles...",
    price: '₱1,500',
  },
  pcgaming: {
    image: Pic3,
    description: "Welcome to the Binary Battleground, the Desktop Gaming Room! Here, the hum of cooling fans harmonizes with the click-clack of mechanical keyboards...",
    price: '₱2,000',
  },
};

export default function Gspace() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [Time, setTime] = useState('');
  const [Room, setRoom] = useState('');


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setTime(timeSlot);
  };

  const handleRoomChange = (roomType) => {
    setRoom(roomType);
  };

  const isDateAvailable = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return selectedDate >= currentDate;
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
  
    if (isDateAvailable(selectedDate)) {
      try {
        const api = axios.create({
          baseURL: import.meta.env.VITE_API,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const response = await api.post('/gspace', {
          date: selectedDate,
          time: Time,
          room: Room,
        });
  
        console.log('Booking successful:', response.data);
  
      } catch (error) {
        console.error('Booking unsuccessful', error);
  
      }
    } else {
      console.log('Selected date is not available for booking.');
    }
  };

  const timeSlots = ['10:00', '12:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00'];

  return (
    <>
      <main className='bg-customPurple text-white'>
        <div className="container mx-auto p-4 flex pt-40 ">
          {/* Left Column */}
          <div className="w-1/2 pr-4">
            <div className="booking-title">
              <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-customPink via-customBlue to-customBlue">Book a Gaming Room</h1>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleFormSubmit}>
              {/* Date Selector */}
              <div className="mb-2 p-2">
                <label className="block text-md text-customDarkPurple font-semibold mb-2">Select Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleDateChange(e.target.value)}
                  value={selectedDate}
                  className="border rounded text-black px-3 py-2 w-full"
                  required
                />
              </div>

              {/* Time Slot Selector */}
              <div className="mb-2 p-2">
                <label className="block text-md text-customDarkPurple font-semibold mb-2">Select Time Slot:</label>
                <select
                  onChange={(e) => handleTimeSlotChange(e.target.value)}
                  value={Time}
                  className="border rounded text-black px-3 py-2 w-full"
                  required
                >
                  <option value="" disabled hidden>Select Time Slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Room Type Selector */}
              <div className="mb-2 p-2">
                <label className="block text-md text-customDarkPurple font-semibold mb-2">Select Room Type:</label>
                <select
                  onChange={(e) => handleRoomChange(e.target.value)}
                  value={Room}
                  className="border rounded text-black px-3 py-2 w-full"
                  required
                >
                  <option value="" disabled hidden>Select Room Type</option>
                  <option value="arcade">Arcade Room</option>
                  <option value="console">Console Room</option>
                  <option value="pcgaming">Desktop Gaming Room</option>
                </select>
              </div>

              {/* Booking Confirmation Section */}
              {selectedDate && Room && (
                <div className="mb-4">
                  <h1 className="booking-title text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-customPink via-customBlue to-customBlue">Confirm Booking</h1>
                  <p className="mb-4"><span className='text-customDarkPurple mr-2'>Date:</span>{selectedDate}</p>
                  <p className="mb-4"><span className='text-customDarkPurple mr-2'>Time Slot:</span> {Time}</p>
                  <p className="mb-4"><span className='text-customDarkPurple mr-2'>Room Type:</span> {Room}</p>
                  {isDateAvailable(selectedDate) ? (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-2 rounded bg-gradient-to-r from-customBlue to-customGreen"
                    >
                      Reserve Now
                    </button>
                  ) : (
                    <p className="text-red-500">Selected date is not available for booking.</p>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-4">
            {/* Room Preview */}
            {Room && RoomDetails[Room] && (
              <div className="mb-4 border rounded-md">
                <h1 className="booking-title text-2xl font-bold ml-5 text-transparent bg-clip-text bg-gradient-to-r from-customPink via-customBlue to-customBlue">Room Preview</h1>

                <img
                  src={RoomDetails[Room].image}
                  alt={`${Room} Room`}
                  className="w-full h-auto rounded p-5"
                />
                <p className="p-4">{RoomDetails[Room].description}</p>
                <p className="p-4">{RoomDetails[Room].price}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}