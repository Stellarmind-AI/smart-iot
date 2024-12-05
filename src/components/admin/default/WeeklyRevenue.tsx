import Card from 'components/card';
import Image from 'next/image';
import { MdMap } from 'react-icons/md';

const WeeklyRevenueWithMap = () => {
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          {/* Image from a URL */}
          <Image
            src="/img/Maps_1.png"
            alt="Location"
            width={500} // Replace with the desired width
            height={500} // Replace with the desired height
            style={{
              borderRadius: '20px',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenueWithMap;
