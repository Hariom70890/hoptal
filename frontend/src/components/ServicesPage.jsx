import React from "react";
import styles from "./ServicesPage.module.css";

const ServicesPage = () => {
  const services = [
    { id: 1, name: "Cardiology", description: "Advanced heart care services." },
    { id: 2, name: "Neurology", description: "Expert brain and nervous system care." },
    { id: 3, name: "Orthopedics", description: "Specialized bone and joint treatment." },
    { id: 4, name: "Pediatrics", description: "Comprehensive child healthcare." },
    { id: 5, name: "Emergency Services", description: "24/7 emergency care for critical needs." },
    { id: 6, name: "Maternity Care", description: "Dedicated care for expectant mothers." },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Our Services</h1>
      <p className={styles.subheading}>
        We provide world-class healthcare services to meet your needs.
      </p>
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <h2 className={styles.serviceName}>{service.name}</h2>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
