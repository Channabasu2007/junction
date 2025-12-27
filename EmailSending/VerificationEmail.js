import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/Components";
import React from "react";

const VerificationEmail = ({ otp, username }) => {
  return (
    <Html>
      <Head />
      <Preview>Junction Verification Code</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header section with the Junction text */}
          <Section style={headerSection}>
            <Text style={junctionText}>Junction</Text>
          </Section>
          {/* Main content section */}
          <Section style={{ textAlign: "center", padding: "20px 40px" }}>
            <Heading style={heading}>Welcome to Junction, {username}!</Heading>
            <Text style={paragraph}>
              Please use the following OTP to verify your email:
            </Text>
            <Text style={otpBox}>{otp}</Text>
            <Text style={paragraph}>
              This code will expire in 1 hour. If you didn’t request this,
              you can safely ignore this email.
            </Text>
            <Text style={footer}>— The Junction Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

// All styles are defined here.
const main = {
  backgroundColor: "#f0f4f8",
  fontFamily: "Inter, Helvetica, Arial, sans-serif",
  padding: "40px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  borderRadius: "16px",
  maxWidth: "500px",
  overflow: "hidden",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
};

const headerSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff7ed",
  padding: "30px",
  borderBottom: "2px solid #f97316",
};

const junctionText = {
  fontSize: "32px",
  color: "#f97316", // Orange-500
  fontWeight: "bold",
  letterSpacing: "2px",
};

const heading = {
  fontSize: "28px",
  marginBottom: "16px",
  color: "#1f2937",
  fontWeight: "600",
};

const paragraph = {
  fontSize: "16px",
  color: "#4b5563",
  marginBottom: "16px",
  lineHeight: "1.5",
};

const otpBox = {
  fontSize: "36px",
  fontWeight: "bold",
  backgroundColor: "#fef3c7",
  padding: "16px 32px",
  borderRadius: "12px",
  display: "inline-block",
  letterSpacing: "8px",
  color: "#f97316",
  marginBottom: "24px",
  userSelect: "none",
};

const footer = {
  fontSize: "14px",
  color: "#9ca3af",
  marginTop: "30px",
  borderTop: "1px solid #e5e7eb",
  paddingTop: "20px",
};
