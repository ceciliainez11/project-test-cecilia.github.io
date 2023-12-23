const postData = [
    { date: "15 September 2023", title: "Post 1", content: "Content 1" },
    { date: "16 September 2023", title: "Post 2", content: "Content 2" },
    { date: "17 September 2023", title: "Post 1", content: "Content 1" },
    { date: "18 September 2023", title: "Post 2", content: "Content 2" },
    { date: "19 September 2023", title: "Post 1", content: "Content 1" },
    { date: "20 September 2023", title: "Post 2", content: "Content 2" },
    { date: "21 September 2023", title: "Post 1", content: "Content 1" },
    { date: "22 September 2023", title: "Post 2", content: "Content 2" },
    { date: "23 September 2023", title: "Post 1", content: "Content 1" },
    { date: "24 September 2023", title: "Post 2", content: "Content 2" },
    { date: "25 September 2023", title: "Post 1", content: "Content 1" },
    { date: "26 September 2023", title: "Post 2", content: "Content 2" },
    { date: "27 September 2023", title: "Post 1", content: "Content 1" },
    { date: "28 September 2023", title: "Post 2", content: "Content 2" },
    { date: "29 September 2023", title: "Post 1", content: "Content 1" },
    { date: "30 September 2023", title: "Post 2", content: "Content 2" },
    // ... tambahkan data post lainnya
];


// Fungsi untuk mengupdate daftar post
function updatePosts() {
    const showPerPage = parseInt(document.getElementById("showPerPage").value);
    const sortBy = document.getElementById("sortBy").value;

    let sortedPosts;
    if (sortBy === "latest") {
        sortedPosts = postData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
        sortedPosts = postData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const slicedPosts = sortedPosts.slice(0, showPerPage);

    renderPosts(slicedPosts);
}

function renderPosts(posts) {
    const postListContainer = document.getElementById("postListContainer");
    postListContainer.innerHTML = "";

    posts.forEach(post => {
        const postItem = document.createElement("li");
        postItem.classList.add("post-list");
        postItem.innerHTML = `
            <a href="news.html" class="post-item">
                <div>
                    <img src="${getPostImage()}" alt="Post Image">
                </div>
                <div class="post-content">
                    <h3 class="post-date">${post.date}</h3>
                    <p>${post.title}</p>
                </div>
            </a>
        `;
        postListContainer.appendChild(postItem);
    });

    renderPagination();
}

// Fungsi untuk merender pagination
function renderPagination() {
    const postListContainer = document.getElementById("postListContainer");
    const showPerPage = parseInt(document.getElementById("showPerPage").value);
    const totalPosts = postData.length;

    const totalPages = Math.ceil(totalPosts / showPerPage);

    const paginationInfo = document.getElementById("paginationInfo");
    paginationInfo.textContent = `Page 1 of ${totalPages}`;

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("span");
        pageButton.classList.add("page-num");
        pageButton.textContent = i;

        pageButton.addEventListener("click", function () {
            const start = (i - 1) * showPerPage;
            const end = start + showPerPage;
            const slicedPosts = postData.slice(start, end);

            renderPosts(slicedPosts);

            paginationInfo.textContent = `Page ${i} of ${totalPages}`;
        });

        pagination.appendChild(pageButton);
    }
}


// Fungsi placeholder untuk mendapatkan URL gambar post
function getPostImage() {
    return "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/43460/original.jpg";
}

// Panggil fungsi updatePosts untuk merender daftar post saat halaman dimuat
document.addEventListener("DOMContentLoaded", updatePosts);


document.addEventListener("DOMContentLoaded", function () {
    var lastScrollTop = window.pageYOffset;
    var header = document.querySelector(".header");
    var navLinks = document.querySelectorAll(".nav-links ul li a");

    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset;

        if (scrollTop > lastScrollTop) {
            // User is scrolling down
            header.classList.add("transparent");
        } else {
            // User is scrolling up
            header.classList.remove("transparent");
        }

        // Save the current scroll position
        lastScrollTop = scrollTop;

        updateActiveState();
    });

    // Function to update active state for menu
    function updateActiveState() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Loop through each section and update active state
        navLinks.forEach(function (link) {
            var sectionId = link.getAttribute("href").substring(1);
            var section = document.getElementById(sectionId);

            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    updateActiveState();
});


document.addEventListener("DOMContentLoaded", function () {
    var parallaxImage = document.querySelector(".parallax-image");

    window.addEventListener("scroll", function () {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
        var parallaxValue = scrollPosition * 0.5;

        parallaxImage.style.transform = "translateY(" + parallaxValue + "px)";
    });
});

// Event listener for changing the number of posts per page
document.getElementById("showPerPage").addEventListener("change", function () {
    postsPerPage = parseInt(this.value, 10); 
    currentPage = 1; 
    updatePosts();
});