import React from 'react'

const Home = () => {
    return (
        <div className='home-container'>
            <h4>Yêu cầu:</h4>
            <p>Sử dụng API từ trang web https://reqres.in/ để tạo website.<br />
                Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các chức năng:
            </p>
            <ul>
                <li>1.Đăng nhập</li>
                <li>2.Thêm User</li>
                <li>3.Sửa User</li>
                <li>4.Xóa User</li>
                <li>5.Hiển thị tất cả các User</li>
                <li>6.Tìm kiếm User theo Id</li>
                <li>7.Sắp xếp theo FirstName</li>
                <li>8.Import User từ file .csv  <i className="fa-solid fa-bug "></i></li>
                <li>9.Export User từ file .csv  <i className="fa-solid fa-bug "></i></li>
            </ul>
            <p className='text-danger'>Lưu ý</p>
            <p>Tự do tùy chỉnh html,css để có một website nhẹ nhàng, khoa học và đẹp<br />Commit và đẩy source code lên github public<br />Triển khai website lên Heroku để demo</p>
            <p><b>Thời gian nộp</b>Thời gian hoàn thành 1-3 ngày.<br />Gửi link Heroku và Github link lại email này <br /> Thời gian phản hồi 2 ngày kể từ ngày nhận được bài thi,
                Yêu cầu backend(optioal-Không bắt buộc):Sử dụng python django rest frameword tạo các api như trên các trang web https://reqres.in/</p>

        </div>
    )
}

export default Home
