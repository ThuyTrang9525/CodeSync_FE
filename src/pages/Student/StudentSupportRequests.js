// StudentSupportRequest.js
"use client"

import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Navbar from '../../components/Student/StudentNavBar';
import SupportRequestFormBody from '../../components/Student/SupportRequestFormBody';
export default function StudentSupportRequest() {
  return (
    <>
      <Header />
      <Navbar />
      <SupportRequestFormBody />
      <Footer />
    </>
  );
}
