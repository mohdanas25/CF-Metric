const searchBtn = document.querySelector("#search-btn");
const display = document.querySelector(".output-section");

searchBtn.addEventListener("click", async () => {
    const userId = document.querySelector("#input-id").value.trim();

    if (!userId) {
        alert("Enter Codeforces Username")
        return;
    }

    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${userId}`);
        const data = await response.json();
        console.log(data.result[0]);

        const user = data.result[0];

        document.querySelector(".input-section").classList.add("hidden");

        display.innerHTML = `
        <div class="userInfo"> 
            <img src="${user.titlePhoto}" alt="User Avatar" id="userpf"/>
            <p><strong>Name:</strong> ${capitalizeWords(user.firstName)} ${capitalizeWords(user.lastName) || "N/A"}</p>
            <p><strong>Username:</strong> <a href="https://codeforces.com/profile/${user.handle}" target="_blank">${user.handle}</a></p>
            <p><strong>Country:</strong> ${capitalizeWords(user.city)}, ${capitalizeWords(user.country) || "N/A"}</p>
            <p><strong>Organization:</strong> ${user.organization || "N/A"}</p>
            <p><strong>Current Rank:</strong> ${capitalizeWords(user.rank) || "N/A"}</p>
            <p><strong>Max Rank:</strong> ${capitalizeWords(user.maxRank) || "N/A"}</p>
            <p><strong>Current Rating:</strong> ${user.rating}</p>
            <p><strong>Maximum Rating:</strong> ${user.maxRating}</p>
            <p><strong>Contribution:</strong> ${user.contribution}</p>
        </div>
        `;

        document.querySelector("#searchAgainBtn").classList.remove("hidden");
        document.querySelector("#searchAgainBtn").addEventListener("click", () => {
            display.innerHTML = "";
            document.querySelector("#searchAgainBtn").classList.add("hidden");
            document.querySelector(".input-section").classList.remove("hidden");
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Network error or Codechef API issue");
    }

});

function capitalizeWords(str) {
    if (!str) return '';
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
