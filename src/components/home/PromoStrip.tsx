export default function PromoStrip() {
  return (
    <div
      className="w-full py-2.5 text-center text-xs sm:text-sm font-medium tracking-wide text-white"
      style={{ backgroundColor: "#C8A96E" }}
    >
      Free delivery on orders over Rs. 3,000 &nbsp;|&nbsp; Use code{" "}
      <span className="font-bold">WELCOME10</span> for 10% off
    </div>
  );
}
