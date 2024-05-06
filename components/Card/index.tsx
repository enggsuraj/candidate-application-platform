import { useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { purple, indigo } from "@mui/material/colors";

import styles from "./Card.module.scss";

const JobDetailsModal = ({ open, onClose, jobDetails }: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>
        <Typography variant="h6" component="h2">
          Full Job Details
        </Typography>
        <Typography>{jobDetails}</Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

const CardComponent = (props: any) => {
  const { data } = props;
  const [showFullDetails, setShowFullDetails] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const trimJobDetails = (details: string) => {
    const words = details.split(" ");
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return details;
  };

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  return (
    <Card sx={{ minWidth: 275 }} className={styles.card}>
      <CardContent>
        <div className={styles.cardHeader}>
          ⌛ Posted {Math.floor(Math.random() * 20) + 1} days ago
        </div>
        <Box className={styles.logo}>
          <Box mr={2}>
            <Image src={data.logoUrl} width={50} height={50} alt="logo" />
          </Box>
          <Box mt={2}>
            <Typography
              variant="h3"
              component="div"
              color="#8b8b8b;"
              fontSize="13px"
              fontWeight="600"
              letterSpacing="1px">
              {data.companyName}
            </Typography>
            <Typography fontSize="10px" lineHeight="1.5" variant="button">
              {data.jobRole}
            </Typography>
            <Typography variant="caption" component="div">
              {data.location}
            </Typography>
          </Box>
        </Box>
        <Typography fontSize="14px" variant="body2" color="#8b8b8b;" mb={1}>
          Estimated Salary : {data.minJdSalary ?? "NA"} -{" "}
          {data.maxJdSalary ?? "NA"} {data.salaryCurrencyCode ?? "NA"} ✅
        </Typography>
        <Typography variant="h6" fontSize="16px">
          About Company
        </Typography>
        <Typography fontSize="12px">
          <strong>About Us</strong>
        </Typography>
        <Typography fontSize="14px">
          {showFullDetails
            ? data.jobDetailsFromCompany
            : trimJobDetails(data.jobDetailsFromCompany)}
        </Typography>
        {!showFullDetails && (
          <div onClick={toggleModal} className={styles.view}>
            View Job
          </div>
        )}
        <Typography
          mt={2}
          fontSize="14px"
          color="text.secondary"
          gutterBottom
          letterSpacing="1px">
          Minimum Experience
        </Typography>
        <Typography fontSize="14px" gutterBottom letterSpacing="1px">
          {data.minExp ?? "NA"} Years
        </Typography>
        <Button className={styles.button}>⚡ Easy Apply</Button>
        <Button className={styles.buttonSecondary}>
          <Avatar
            style={{ transform: "translateX(10px)" }}
            sx={{ bgcolor: indigo[200], width: 32, height: 32 }}>
            {getRandomLetter()}
          </Avatar>
          <Avatar sx={{ bgcolor: purple[200], width: 32, height: 32 }}>
            {getRandomLetter()}
          </Avatar>
          &nbsp;Unlock referrals ask
        </Button>
      </CardContent>
      <JobDetailsModal
        open={modalOpen}
        onClose={toggleModal}
        jobDetails={data.jobDetailsFromCompany}
      />
    </Card>
  );
};

export default CardComponent;
