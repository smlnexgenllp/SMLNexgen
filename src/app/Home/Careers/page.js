// // pages/careers.js
// export async function getServerSideProps() {
//   const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
//   const res = await fetch(`${backendUrl}/api/jobs`);
//   const jobs = await res.json();
//   return { props: { jobs } };
// }

// function Careers({ jobs }) {
//   return (
//     <div>
//       <h1>Careers</h1>
//       {jobs.map((job) => (
//         <div key={job.id}>
//           <h2>{job.title}</h2>
//           <p>{job.description}</p>
//           {/* Add more job details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Careers;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page