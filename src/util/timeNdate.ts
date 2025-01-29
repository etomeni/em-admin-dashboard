export function calculateAge(dateOfBirth: string): number {
    // Parse the date of birth string into a Date object
    const dob = new Date(dateOfBirth);
    
    // Get the current date
    const today = new Date();
    
    // Calculate the difference in years
    let age = today.getFullYear() - dob.getFullYear();
    
    // Adjust if the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    return age;
}