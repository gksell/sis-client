import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useSelector } from 'react-redux';
import Menu from './Menu';

const TeacherCourses = () => {
    const authState = useSelector(state => state.auth);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [error, setError] = useState('');
    const [errorDialog, setErrorDialog] = useState();
    const [teacherId, setTeacherId] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [students, setStudents] = useState([]);

    const authToken = authState.token;
    const config = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    };

    useEffect(() => {
        const userId = authState.user;

        createAPIEndpoint(ENDPOINTS.teachers + '/by-user-id' + `/${userId}`)
            .fetch()
            .then((response) => {
                const teacher = response.data;
                if (teacher && teacher.id) {
                    setTeacherId(teacher.id);
                }
            })
            .catch((error) => {
                setError('Öğretmen bilgisi alınırken bir hata oluştu.');
            });
    }, [authState.token, authState.user]);

    useEffect(() => {
        if (teacherId) {
            const endpoint = ENDPOINTS.teachersCourses.replace('{teacherId}', teacherId);

            createAPIEndpoint(endpoint, config)
                .fetch()
                .then((response) => {
                    setTeacherCourses(response.data);
                })
                .catch((error) => {
                    setErrorDialog('Kurs listesi alınırken bir hata oluştu.');
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                });
        }
    }, [teacherId]);

    const handleShowStudents = (courseId) => {
        setSelectedCourseId(courseId);
        setOpenDialog(true);

        const studentsEndpoint = ENDPOINTS.studentcourses + '/get-student-by-course-id/' + courseId;

        createAPIEndpoint(studentsEndpoint, config)
            .fetch()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                setError('Öğrenci bilgileri alınırken bir hata oluştu.');
                setTimeout(() => {
                    setError(null);
                }, 3000);
            });
    };

    const handleAddStudentGrade = (studentId, courseId, grade) => {
        const requestModel = {
            studentId: studentId,
            courseId: courseId,
            grade: grade
        };

        const endpoint = ENDPOINTS.notes;

        createAPIEndpoint(endpoint, config)
            .post(requestModel)
            .then((response) => {

                console.log(response);
                setStudents(prevStudents => {
                    const updatedStudents = [...prevStudents];
                    const updatedStudent = { ...updatedStudents.find(student => student.id === studentId), grade: grade };
                    const studentIndex = updatedStudents.findIndex(student => student.id === studentId);
                    updatedStudents[studentIndex] = updatedStudent;
                    return updatedStudents;
                });
            })
            .catch((error) => {
                console.log(error);
                setErrorDialog(error.response.data.errors, errorDialog);
            });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Menu />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: '50%', padding: '20px' }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Kurslarım
                        </Typography>
                        {error && <Typography color="error">{error}</Typography>}
                        <List>
                            {teacherCourses.map((course, index) => (
                                <ListItem key={course.id}>
                                    <ListItemText primary={`${index + 1}. ${course.courseName}`} />
                                    <Button variant="outlined" onClick={() => handleShowStudents(course.id)}>
                                        Öğrenciler
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>
                        <strong>ÖĞRENCİLER</strong>
                        {errorDialog && <Typography color="error">{errorDialog}</Typography>}
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {students.map((student, index) => (
                                <ListItem key={student.id}>
                                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                        <Grid item xs={4}>
                                            <ListItemText primary={`${index + 1}. ${student.firstName} ${student.lastName}`} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Notu (0-100)"
                                                variant="outlined"
                                                margin="normal"
                                                value={student.grade || ''}
                                                onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        if (e.target.value.length <= 3) {
                                                            setStudents((prevStudents) => {
                                                                const updatedStudents = [...prevStudents];
                                                                const updatedStudent = { ...updatedStudents[index], grade: e.target.value };
                                                                updatedStudents[index] = updatedStudent;
                                                                return updatedStudents;
                                                            });
                                                        }
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAddStudentGrade(student.id, selectedCourseId, student.grade)}
                                            >
                                                Not Ekle
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Kapat
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default TeacherCourses;
