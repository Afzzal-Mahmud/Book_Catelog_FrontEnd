import { Puff } from "react-loader-spinner";

function Spinner() {
  return (
    <>
      <div className="flex items-center justify-center">
        <Puff
          height="100"
          width="100"
          radius={1}
          color="#e8d05d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </>
  );
}

export default Spinner;
