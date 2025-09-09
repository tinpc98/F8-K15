const player = {
  NEXT: 1,
  PREV: -1,
  // get dom elements
  playlist: document.querySelector(".playlist"),
  songTitle: document.querySelector(".song-title"),
  audio: document.querySelector("#audio"),
  togglePlayBtn: document.querySelector(".btn-toggle-play"),
  playIcon: document.querySelector("#play-icon"),
  btnPrev: document.querySelector(".btn-prev"),
  btnNext: document.querySelector(".btn-next"),
  progress: document.querySelector("#progress"),
  repeatBtn: document.querySelector(".btn-repeat"),
  shuffeBtn: document.querySelector(".btn-random"),
  cd: document.querySelector(".cd"),

  isSeeking: false,
  isReapeat: localStorage.getItem("isReapeat") === "true",
  isShuffe: localStorage.getItem("isShuffe") === "true",
  // Mảng chứa các bài hát
  songs: [
    {
      id: 1,
      name: "Kho Báu (with Rhymastic)",
      path: "./musics/music1.mp3",
      artist: "Nguyễn A",
    },
    {
      id: 2,
      name: "NÉT",
      path: "./musics/music2.mp3",
      artist: "Nguyễn B",
    },
    {
      id: 3,
      name: "Yêu Em Dài Lâu - Yêu 5",
      path: "./musics/music3.mp3",
      artist: "Nguyễn C",
    },
    {
      id: 4,
      name: "Bên Trên Tầng Lầu",
      path: "./musics/Bên Trên Tầng Lầu.mp3",
      artist: "Tăng Duy Tân",
    },
    {
      id: 5,
      name: "Cắt Đôi Nỗi Sầu",
      path: "./musics/Cắt Đôi Nỗi Sầu.mp3",
      artist: "Tăng Duy Tân",
    },
    {
      id: 6,
      name: "Dạ Vũ",
      path: "./musics/Dạ Vũ.mp3",
      artist: "Tăng Duy Tân",
    },
  ],
  //Mảng chứa các bài hát trong shuffe
  replaySong: [],
  // chỉ mục hiện tại
  currentIndex: 0,
  //lấy danh sách bài hát
  getCurrentSong() {
    return this.songs[this.currentIndex];
  },
  loadCurrentSong() {
    //tải bài hát hiện tại
    const currentSong = this.getCurrentSong();
    //hiển thị bài hát hiện tại
    this.songTitle.textContent = currentSong.name;
    //đặt src của thẻ audio thành đường dẫn bài hát hiện tại
    this.audio.src = currentSong.path;
  },
  handlePreOrNext(step) {
    if (this.isShuffe && step === this.NEXT) {
      this.getNextShuffeSong();
    } else {
      this.currentIndex =
        (this.currentIndex + step + this.songs.length) % this.songs.length; // vòng lặp để bài hát chạy vòng tròn
    }

    this.loadCurrentSong(); // load lai thông tin bài hát
    this.render();
    this.audio.play(); // luôn play sau khi chuyển bài
  },

  getNextShuffeSong() {
    //lấy danh sách những bài chưa phát
    const remainingSongs = this.songs.filter(
      (song) => !this.replaySong.includes(song.id)
    );

    if (remainingSongs.length === 0) {
      this.replaySong = [];
      return this.getNextShuffeSong();
    } //hết danh sách thì reset
    const randomSong =
      remainingSongs[Math.floor(Math.random() * remainingSongs.length)]; // lấy ngẫu nhiên 1 bài vào trong remainingSongs

    this.replaySong.push(randomSong.id); //thêm vào mảng đã phát

    this.currentIndex = this.songs.findIndex(
      (song) => song.id === randomSong.id //cập nhật cuerent index bài tiếp theo
    );
    return randomSong;
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}: ${secs < 10 ? "0" + secs : secs}`;
  },

  init() {
    this.loadCurrentSong();

    // xử lý sự kiện DOM
    // xử lý thời gian trên thanh
    this.currentTimeEl = document.querySelector("#current-time");
    this.durationEl = document.querySelector("#duration");

    this.audio.addEventListener("loadedmetadata", () => {
      this.durationEl.textContent = this.formatTime(this.audio.duration);
    });

    this.audio.addEventListener("timeupdate", () => {
      const { duration, currentTime } = this.audio;
      if (!duration) return;

      this.progress.value = Math.round((currentTime / duration) * 100);

      this.currentTimeEl.textContent = this.formatTime(currentTime);
    });
    //Xử lý sự kiện play/pause
    this.togglePlayBtn.addEventListener("click", () => {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    });

    //xử lý sự kiện click để chọn bài
    this.playlist.addEventListener("click", (e) => {
      const songNode = e.target.closest(".song");
      if (songNode && !songNode.classList.contains("active")) {
        const index = Number(songNode.dataset.index);
        this.currentIndex = index;
        this.loadCurrentSong();
        this.render();
        this.audio.play();
      }
    });

    //đổi icon thành pause khi bài hát được play
    this.audio.addEventListener("play", () => {
      this.playIcon.classList.remove("fa-play");
      this.playIcon.classList.add("fa-pause");

      this.cd.classList.add("playing");
      this.cd.style.animationPlayState = "running";
    });
    //đổi icon thành pause khi bài hát được pause
    this.audio.addEventListener("pause", () => {
      this.playIcon.classList.remove("fa-pause");
      this.playIcon.classList.add("fa-play");

      this.cd.style.animationPlayState = "paused";
    });

    //nhấn next để chuyển bài hát tiếp theo
    this.btnNext.addEventListener("click", () => {
      this.handlePreOrNext(this.NEXT); //xử lý next
    });
    this.btnPrev.addEventListener("click", () => {
      if (this.audio.currentTime > 2) {
        this.audio.currentTime = 0;
      } else {
        this.handlePreOrNext(this.PREV); //xử lý prev
      }
    });

    //kéo thả để tua
    this.audio.addEventListener("timeupdate", () => {
      const { duration, currentTime } = this.audio;
      if (!duration || this.isSeeking) return;
      this.progress.value = Math.round((currentTime / duration) * 100);
    });

    this.progress.addEventListener("mousedown", () => {
      this.isSeeking = true;
    });
    this.progress.addEventListener("mouseup", (e) => {
      this.isSeeking = false;
      const nextProgress = e.target.value;
      const nextDuration = (nextProgress / 100) * this.audio.duration;
      this.audio.currentTime = nextDuration;
    });

    //tạo sự kiện khi hết bài sẽ tự next
    this.audio.addEventListener("ended", () => {
      if (this.isReapeat) {
        this.audio.play();
      } else {
        this.handlePreOrNext(this.NEXT);
      }
    });

    //tạo sự kiện repeat
    this.repeatBtn.addEventListener("click", () => {
      this.isReapeat = !this.isReapeat;
      this.repeatBtn.classList.toggle("active", this.isReapeat);
      localStorage.setItem("isReapeat", this.isReapeat);
    });

    //tạo sự kiện shuffe
    this.shuffeBtn.addEventListener("click", () => {
      this.isShuffe = !this.isShuffe;
      this.shuffeBtn.classList.toggle("active", this.isShuffe);
      localStorage.setItem("isShuffe", this.isShuffe);
    });
    this.render();

    //cập nhật trạng thái các nút repeat, shuffe
    this.repeatBtn.classList.toggle("active", this.isReapeat);
    this.shuffeBtn.classList.toggle("active", this.isShuffe);
  },

  render() {
    const html = this.songs
      .map((song, index) => {
        return `
                <div class="song song-title ${
                  this.currentIndex === index ? "active" : ""
                }" data-index = "${index}">
                    <div class="thumb" style="background-image: url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.artist}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
      })
      .join("");
    this.playlist.innerHTML = html;
  },
};

// Khởi tạo player
player.init();
