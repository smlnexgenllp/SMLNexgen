import { useRouter } from "next/router";
  // Import the Home.js page

const PortfolioDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {/* Portfolio Item Details */}
      <section>
        <h1>Portfolio Item {id}</h1>
        <p>Details about project {id} go here.</p>
      </section>

      {/* Home Page Content Below */}
      <section>
       
      </section>
    </div>
  );
};

export default PortfolioDetail;


