export function calculateTotalCost(startTime: string, endTime: string, pricePerHour: number): number {

    // Parse start time hours and minutes
    const startHours = parseInt(startTime.substr(0, 2));//15:00
    const startMinutes = parseInt(startTime.substr(3, 2));
  
    // Parse end time hours and minutes
    const endHours = parseInt(endTime.substr(0, 2));//13:00
    const endMinutes = parseInt(endTime.substr(3, 2));
  
    // Calculate total minutes from midnight for start and end time
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    // Calculate duration in hours
    const durationHours = (endTotalMinutes - startTotalMinutes) / 60;
  
    // Calculate total cost
    const totalCost = durationHours * pricePerHour;
  
    return totalCost;
  }
  
  