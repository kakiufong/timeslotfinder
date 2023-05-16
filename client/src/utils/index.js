export const toggleBoolean = (prev) => !prev;

const isValidArrayIndex = (arr, idx) => {
  return !(idx < 0 || idx >= arr.length);
};

export function addValueAtIndex(arr, idx, value) {
  if (!isValidArrayIndex(arr, idx) && idx !== arr.length) {
    throw new Error(`Cannot add value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), value, ...arr.slice(idx)];
}

export function replaceValueAtIndex(arr, idx, newValue) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), newValue, ...arr.slice(idx + 1)];
}

export function updateValueAtIndex(arr, idx, updater) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), updater(arr[idx]), ...arr.slice(idx + 1)];
}

export function removeValueAtIndex(arr, idx) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const isSameTodo = (todo1, todo2) =>
  String(todo1?._id) === String(todo2?._id);

export const getTodoIndex = (todos, todo) => {
  const idx = todos.findIndex((t) => isSameTodo(t, todo));
  return idx >= 0 ? idx : null;
};

export const isSameEvent = (event1, event2) =>
  String(event1?._id) === String(event2?._id);

export const getEventIndex = (events, event) => {
  const idx = events.findIndex((t) => isSameEvent(t, event));
  return idx >= 0 ? idx : null;
};

export const createTimeSlots = (startDateTime, endDateTime, slotDuration, startHour, endHour) => {
  const timeSlots = new Map();
  const currentDate = new Date(startDateTime);

  // Set the starting hour of each day to the startHour value (if it's defined)
  currentDate.setHours(startHour, 0, 0, 0);
  // Loop through each time slot and add to the Map
  while (currentDate < endDateTime) {
    const slotDate = new Date(currentDate);

    // Check if this timeslot falls within the allowed range
    const currentHour = currentDate.getHours();
    if (currentHour >= startHour && currentHour < endHour) {
      const dateString = slotDate.toISOString();
      timeSlots.set(dateString, { value: 0 });
    }

    currentDate.setMinutes(currentDate.getMinutes() + slotDuration);

    if (currentHour >= endHour) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(startHour, 0, 0, 0);
    }
  }

  return timeSlots;
}