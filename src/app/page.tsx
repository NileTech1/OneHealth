import Image from 'next/image';
import heroImage from '../../public/next.svg';

export default async function Home() {
  return (
    <main>
      <section className="flex flex-col md:flex-row items-center justify-center py-20">
        <div className="md:w-1/2 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-500 inline bg-clip-text text-transparent">
            Welcome to OneHealth Platform
          </h1>
          <p className="text-lg mb-8">
            OneHealth Platform is a comprehensive health platform developed by Nile Technology Solution for the purpose of recording patients data in a centralized data center.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-purple-500 hover:from-purple-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 px-4 mt-8 md:mt-0">
          <Image src={heroImage} alt="OneHealth Platform" className="rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Centralized Data Management</h3>
              <p>Store and manage patient data securely in a centralized data center.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Intuitive User Interface</h3>
              <p>Easy-to-use interface for healthcare professionals to access and update patient records.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Real-time Collaboration</h3>
              <p>Enable real-time collaboration among healthcare providers for better patient care.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Choose OneHealth?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Secure and Reliable</h3>
              <p>OneHealth Platform ensures the security and reliability of patient data with advanced encryption and backup mechanisms.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Cost-effective Solution</h3>
              <p>Our SaaS model provides a cost-effective solution for healthcare organizations of all sizes, with no upfront costs or maintenance fees.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Scalable and Flexible</h3>
              <p>OneHealth Platform is designed to scale with your organizations growth and adapt to your specific needs and workflows.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Dedicated Support</h3>
              <p>Our team of experts provides dedicated support and training to ensure a smooth implementation and ongoing success of your OneHealth Platform.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
