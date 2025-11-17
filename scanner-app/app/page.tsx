import LabDropdown from './LabDropdown';

export default function HomePage() {
  return (
    <section>
      <h1 className="flex justify-center items-center text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">Lab Check-In</h1>
      <h2 className="flex justify-center items-center text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Please select a course to start scanning</h2>

      <LabDropdown />
    </section>
  );
}