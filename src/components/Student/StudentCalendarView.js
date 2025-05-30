import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import "../../assets/css/StudentCalendar.css";
import {
  fetchEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../service/api';
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState('timeGridWeek');

  // Form fields state (for add/update)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    color: '#00FF00',
  });

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

 const fetchEvents = async () => {
  try {
    const data = await fetchEvent();
    const formatted = data.map((e) => ({
      id: String(e.eventID || e.id),
      title: e.title,
      start: e.start_time,
      end: e.end_time,
      color: e.color || '#cfe9ff',
      extendedProps: {
        description: e.description,
      },
    }));
    setEvents(formatted);
  } catch (err) {
    console.error('Error fetching events:', err);
    setEvents([]);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  // Thay đổi form data khi người dùng nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mở modal thêm sự kiện
  const handleSelect = (selectInfo) => {
    setDeleteInfo(null);
    setFormPosition({ x: selectInfo.jsEvent.pageX, y: selectInfo.jsEvent.pageY });
    setSelectedRange({ start: selectInfo.startStr, end: selectInfo.endStr });
    setModalOpen(true);
    // Set mặc định thời gian trong form
    setFormData({
      title: '',
      description: '',
      start_time: selectInfo.startStr,
      end_time: selectInfo.endStr,
      color: '#00FF00',
    });
  };

  // Click vào event để sửa hoặc xóa
  const handleEventClick = (clickInfo) => {
    setDeleteInfo(null);
    setFormPosition({ x: clickInfo.jsEvent.pageX, y: clickInfo.jsEvent.pageY });
    setSelectedRange(null);
    setModalOpen(true);
    // Lấy dữ liệu event hiện tại để chỉnh sửa
    const ev = clickInfo.event;
    setFormData({
      id: ev.id,
      title: ev.title,
      description: ev.extendedProps.description || '',
      start_time: dayjs(ev.start).format('YYYY-MM-DDTHH:mm:ss'),
      end_time: dayjs(ev.end).format('YYYY-MM-DDTHH:mm:ss'),
      color: ev.backgroundColor || '#00FF00',
    });
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRange(null);
    setFormPosition(null);
    setDeleteInfo(null);
  };

  // Gửi request tạo hoặc cập nhật event
const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    title: formData.title,
    description: formData.description,
    start_time: formData.start_time,
    end_time: formData.end_time,
    color: formData.color,
  };

  try {
    if (formData.id) {
      await updateEvent(formData.id, payload);
    } else {
      await createEvent(payload);
    }
    await fetchEvents();
    handleClose();
  } catch (error) {
    console.error('Error saving event:', error);
  }
};


  // Xóa event
const handleDelete = async () => {
  if (!formData.id) return;
  try {
    await deleteEvent(formData.id);
    await fetchEvents();
    handleClose();
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

  const handleTabChange = (event, newValue) => {
    setView(newValue);
    calendarRef.current?.getApi().changeView(newValue);
  };

  return (
    <div className="calendar-wrapper container" style={{ position: 'relative', minHeight: '700px', display: 'flex' }}>
      {/* Sidebar mini calendar */}
      <div className="calendar-sidebar" style={{ width: 300, marginRight: 24 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'title', right: 'prev,next' }}
          height="auto"
          selectable={true}
          events={events}
          dateClick={(arg) => {
            setSelectedRange({ start: arg.dateStr, end: arg.dateStr });
            setModalOpen(true);
            setFormData({
              title: '',
              description: '',
              start_time: arg.dateStr + 'T07:00:00', // mặc định 7h sáng
              end_time: arg.dateStr + 'T08:00:00',
              color: '#00FF00',
            });
          }}
          dayHeaderFormat={{ weekday: 'narrow' }}
          className="mini-calendar"
        />
      </div>

      {/* Main calendar */}
      <div className="calendar-main" style={{ flex: 1 }}>
        <Tabs
          value={view}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            marginBottom: 2,
            '& .MuiTabs-indicator': { backgroundColor: '#2ecc71' },
            '& .MuiTab-root': { color: '#555', fontWeight: 500 },
            '& .Mui-selected': { color: '#2ecc71 !important' },
          }}
        >
          <Tab value="dayGridMonth" label="Tháng" />
          <Tab value="timeGridWeek" label="Tuần" />
          <Tab value="timeGridDay" label="Ngày" />
        </Tabs>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          initialDate={currentDate}
          headerToolbar={{ start: 'prev,today,next', center: 'title', end: '' }}
          events={events}
          allDaySlot={false}
          slotMinTime="00:00:00"   // bắt đầu hiển thị từ 0h (nửa đêm)
          slotMaxTime="24:00:00" 
          height="auto"
          selectable={true}
          select={handleSelect}
          dateClick={(arg) => {
            setSelectedRange({ start: arg.dateStr, end: arg.dateStr });
            setModalOpen(true);
            setFormData({
              title: '',
              description: '',
              start_time: arg.dateStr + 'T07:00:00',
              end_time: arg.dateStr + 'T08:00:00',
              color: '#00FF00',
            });
          }}
          eventClick={handleEventClick}
          className="weekly-calendar"
        />
      </div>

      {/* Modal tạo/sửa sự kiện */}
      <Modal open={modalOpen} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper',
          boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Typography variant="h6" gutterBottom>{formData.id ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}</Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            />
            <textarea
              name="description"
              placeholder="Mô tả"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: '100%', marginBottom: 10, padding: 8, resize: 'vertical' }}
            />
            <label>Bắt đầu:</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              required
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            />
            <label>Kết thúc:</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              required
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            />
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              style={{ width: '100%', height: 40, marginBottom: 10, border: 'none', cursor: 'pointer' }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained" color="primary">
                {formData.id ? 'Cập nhật' : 'Tạo'}
              </Button>
              {formData.id && (
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Xóa
                </Button>
              )}
              <Button variant="text" onClick={handleClose}>Hủy</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Calendar;
