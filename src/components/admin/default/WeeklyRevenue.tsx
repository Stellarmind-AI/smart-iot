import Card from 'components/card';
import { MdMap } from 'react-icons/md';

const WeeklyRevenueWithMap = () => {
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          {/* Image from a URL */}
          <img
            src="/img/map-img.jpg" // Replace this URL with the actual image URL
            alt="Location"
            style={{
              borderRadius: "20px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenueWithMap;
