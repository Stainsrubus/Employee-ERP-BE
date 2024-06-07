const markAttendance = async (employeeId,status) => {
    try {
      const newAttendance = new attendanceModel({
        employeeId,
        status
      });
  
      await newAttendance.save();
      console.log('Attendance marked successfully!');
  
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };
  
 export default {
    markAttendance
 }