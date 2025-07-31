import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";
import React from "react";

const VerificationEmail = ({ otp, username }) => {
  return (
    <Html>
      <Head />
      <Preview>Junction Verification Code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
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

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "500px",
};

const logoSection = {
  textAlign: "center",
};

const heading = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333333",
};

const paragraph = {
  fontSize: "16px",
  color: "#555555",
  marginBottom: "20px",
};

const otpBox = {
  fontSize: "30px",
  fontWeight: "bold",
  backgroundColor: "#f0f0f0",
  padding: "12px 24px",
  borderRadius: "6px",
  display: "inline-block",
  letterSpacing: "4px",
  color: "#000",
  marginBottom: "20px",
};

const footer = {
  fontSize: "14px",
  color: "#999999",
  marginTop: "30px",
};
