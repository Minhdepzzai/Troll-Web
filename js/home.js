const modal = document.getElementById('modal');
    const createBtn = document.getElementById('create-btn');
    const createFab = document.getElementById('create-fab');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalBackdrop = document.getElementById('modal-backdrop');

    function openModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
    }
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.setAttribute('aria-hidden', 'true');
    }

    function addTemplateCard({ title, description, price, views,file_name, category }) {
        const container = document.getElementById("create-post");
        if (!container) return console.error("Không tìm thấy #create-post");

        const article = document.createElement("article");
        article.className = "col-span-1 sm:col-span-1 lg:col-span-1 rounded-lg bg-gray-800/50 p-4 border border-white/5";
        const baseURL = "https://minhdepzzai.github.io/Troll-Web/";
        article.innerHTML = `
            <div class="h-40 rounded-lg overflow-hidden mb-3 relative">
              <img src="${baseURL}${file_name}"
                  class="w-full h-full object-cover"
                  alt="preview">
              
              <!-- Tag category -->
              <span class="absolute bottom-3 left-3 bg-black/40 text-xs py-1 px-2 rounded text-white">
                  ${category}
              </span>
          </div>

            <h3 class="font-semibold text-lg">${title}</h3>
            <p class="text-sm text-gray-400 my-2">${description}</p>

            <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-3">
                <span class="text-sm font-medium">₫${price.toLocaleString()}</span>
                <span class="text-xs text-gray-400">• ${views} Đánh giá</span>
                <span class="text-gray-400">5.0 ★</span>
            </div>
            <div class="flex items-center gap-2">
                <button class="px-3 py-1 text-sm rounded bg-white/5 hover:bg-white/10">Liên hệ</button>
                <button class="px-3 py-1 text-sm rounded bg-indigo-600 hover:bg-indigo-500 text-white">Mua</button>
            </div>
            </div>
        `;

        container.appendChild(article);
    }


    createBtn?.addEventListener('click', openModal);
    createFab?.addEventListener('click', openModal);
    modalClose?.addEventListener('click', closeModal);
    modalCancel?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // Example client-side handler: serialize form and show preview (replace with real backend call)
    // async function handleSubmit(e) {
    //   e.preventDefault();
    //   const form = e.target;
    //   const data = new FormData(form);

    //   // For demo: just show a confirm and reset
    //   // In real app: upload file to storage (S3/Firebase Storage), send metadata to your API
    //   const title = data.get('title');
    //   const price = data.get('price');
    //   const description = data.get('description')
    //   const category = data.get('category')
    // //   const file_img = data.get('file')
    // const fileInput = document.getElementById("file");
    // const file = fileInput.files[0];
    // const fileURL = file ? URL.createObjectURL(file) : "default-image.jpg";
    // //   alert('Đã gửi bài: ' + title + ' (Giá: ' + price + ' VND) - demo only');
    //     console.log(title)
    //     console.log(price)
    //     console.log(description)
    //     console.log(category)
    //     console.log(file_img)
    //     addTemplateCard({
    //         title: title,
    //         description: description,
    //         price: Number(price),
    //         views: 100,
    //         file_name: fileURL  // dùng fileURL thay vì file_img
    //     });
    //   form.reset();
    //   closeModal();
    // }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        const title = data.get('title');
        const price = data.get('price');
        const description = data.get('description');
        const category = data.get('category');

        const fileInput = document.getElementById("file");
        const file = fileInput.files[0];
        const fileURL = file ? URL.createObjectURL(file) : "default-image.jpg";

        addTemplateCard({
            title: title,
            description: description,
            price: Number(price),
            views: 100,
            file_name: fileURL,
            category: category
        });

        form.reset();
        closeModal();
        }
