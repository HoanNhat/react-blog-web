import React from "react";

const AboutMe = () => {
  return (
    <div className=" items-center w-1/2">
      <h1 className="mt-8 text-center text-5xl font-bold">About me</h1>
      <h2 className="text-center text-2xl font-thin italic">
        Le Hoan Nhat - An internship
      </h2>
      <section className="ml-6">
        <h2 className="text-center text-2xl font-thin ">
          Giới thiệu về project Blog Web
        </h2>
        <p className="text-xl mt-8">
          Chào mừng bạn đến với trang blog của tôi đây là dự án mà tôi thực hiện
          trong lĩnh vực công nghệ thông tin. Trang blog này được lập trình và
          thiết kế bởi chính tôi, với mục tiêu cung cấp một cái nhìn về khả năng
          áp dụng và làm việc trên dự án thực tế.
        </p>
        <div className="mt-4">
          <h2 className="mb-2 text-xl text-gray-900 dark:text-white">
            Mô tả: Đây là một ứng dụng web giúp người dùng xem và chia sẻ các
            bài viết ở mọi lĩnh vực. Ứng dụng được xây dựng bằng React và
            Node.js.
          </h2>
          <ul className="max-w-md space-y-1 list-disc list-inside text-xl">
            Công nghệ sử dụng:
            <li>Frontend: React, Node.js sử dụng database là MongoDB.</li>
            <li>Backend: Java Spring Boot</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
