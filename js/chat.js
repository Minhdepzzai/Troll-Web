 /* -------------------------
       Demo client-side "model"
       ------------------------- */
        const demoConvos = [{
                id: 'c1',
                name: 'DoMini',
                last: 'Mình cần 1 dashboard',
                online: true,
                avatar: 'https://minhdepzzai.github.io/OnlyCode/img/mixi.png', // <-- sửa chỗ này
                messages: [
                    // {
                    //     id: 'm1',
                    //     from: 'them',
                    //     text: 'Chào bạn, template còn không?',
                    //     time: Date.now() - 1000 * 60 * 60
                    // },
                    // {
                    //     id: 'm2',
                    //     from: 'me',
                    //     text: 'Còn bạn cần chức năng gì?',
                    //     time: Date.now() - 1000 * 60 * 50
                    // },
                    
                ],
                escrows: []
            },
            {
                id: 'c2',
                name: 'Admin',
                last: 'Mình cần 1 dashboard',
                online: true,
                avatar: 'https://minhdepzzai.github.io/OnlyCode/img/three.png', // <-- sửa chỗ này
                messages: [
                    // {
                    //     id: 'm1',
                    //     from: 'them',
                    //     text: 'Chào bạn, template còn không?',
                    //     time: Date.now() - 1000 * 60 * 60
                    // },
                    // {
                    //     id: 'm2',
                    //     from: 'me',
                    //     text: 'Còn bạn cần chức năng gì?',
                    //     time: Date.now() - 1000 * 60 * 50
                    // },
                    
                ],
                escrows: []
            },
            //   { id: 'c2', name: 'Người bán - An', last: 'OK mình gửi file', online: false, messages: [
            //     {id:'m3', from:'them', text:'Mình có template landing, giá 99k', time: Date.now()-1000*60*60*24},
            //   ], escrows: [] }
        ];

        let selectedConvo = null;

        /* ---------- render list ---------- */
        const convoList = document.getElementById('convo-list');

        function renderConvoList() {
            convoList.innerHTML = '';
            demoConvos.forEach(c => {
                const li = document.createElement('li');
                li.className = 'p-2 rounded hover:bg-white/5 cursor-pointer flex items-center gap-3';
                //         li.innerHTML = `
                //   <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-semibold">${c.name.split(' ').slice(-1)[0][0]}</div>
                //   <div class="flex-1">
                //     <div class="flex items-center justify-between">
                //       <div class="font-medium text-sm">${c.name}</div>
                //       <div class="text-xs text-gray-400">${c.online ? 'Online' : 'Offline'}</div>
                //     </div>
                //     <div class="text-xs text-gray-400 truncate">${c.messages.slice(-1)[0]?.text || ''}</div>
                //   </div>
                // `;
                li.innerHTML = `
                    <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        ${c.avatar
                        ? `<img src="${c.avatar}" alt="${escapeHtml(c.name)}" class="w-full h-full object-cover" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div class=&quot;w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-semibold&quot;>${escapeHtml(c.name.split(' ').slice(-1)[0][0])}</div>'">`
                        : `<div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-semibold">${escapeHtml(c.name.split(' ').slice(-1)[0][0])}</div>`}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                        <div class="font-medium text-sm">${escapeHtml(c.name)}</div>
                        <div class="text-xs text-gray-400">${c.online ? 'Online' : 'Offline'}</div>
                        </div>
                        <div class="text-xs text-gray-400 truncate">${escapeHtml(c.messages.slice(-1)[0]?.text || '')}</div>
                    </div>
                    `;
                li.addEventListener('click', () => openConvo(c.id));
                convoList.appendChild(li);
            });
        }
        
        /* ---------- open convo ---------- */
        const messagesEl = document.getElementById('messages');
        const chatTitle = document.getElementById('chat-title');
        const chatSub = document.getElementById('chat-sub');
        const escrowPanel = document.getElementById('escrow-panel');

        // function openConvo(id) {
        //     selectedConvo = demoConvos.find(x => x.id === id);
        //     chatTitle.textContent = selectedConvo.name;
        //     chatSub.textContent = selectedConvo.online ? 'Online' : 'Offline';
        //     renderMessages();
        //     renderEscrowPanel();
        //     // show chat shell on mobile if hidden
        //     document.querySelector('#chat-shell').scrollIntoView({
        //         behavior: 'smooth'
        //     });
        // }

        function openConvo(id) {
            selectedConvo = demoConvos.find(x => x.id === id);
            chatTitle.textContent = selectedConvo.name;
            chatSub.textContent = selectedConvo.online ? 'Online' : 'Offline';

            // --- chèn đoạn đồng bộ avatar ở đây ---
            const headerAvatar = document.querySelector('#chat-shell header .w-10.h-10');
            if (selectedConvo.avatar) {
                headerAvatar.innerHTML = `<img src="${selectedConvo.avatar}" alt="${escapeHtml(selectedConvo.name)}" class="w-full h-full object-cover rounded-full">`;
                headerAvatar.classList.remove('bg-gradient-to-br','from-green-500','to-teal-400','font-semibold');
            } else {
                headerAvatar.innerHTML = selectedConvo.name[0].toUpperCase();
                headerAvatar.classList.add('bg-gradient-to-br','from-green-500','to-teal-400','font-semibold');
            }
            // --- end avatar ---

            renderMessages();
            renderEscrowPanel();
            document.querySelector('#chat-shell').scrollIntoView({ behavior: 'smooth' });
        }
        function sendAutoVideoMessage(text, videoUrl) {
            if (!selectedConvo) return alert("Chưa chọn cuộc trò chuyện");

            const msg = {
                id: 'm' + Math.random().toString(36).slice(2),
                from: 'them',       
                type: 'video',
                text: text,
                videoUrl: videoUrl,
                time: Date.now()
            };

            selectedConvo.messages.push(msg);
            renderMessages();
        }
        function sendImageMessage(text, imageUrl) {
            if (!selectedConvo) return alert("Chưa chọn cuộc trò chuyện");

            const msg = {
                id: 'm' + Math.random().toString(36).slice(2),
                from: 'me',       
                type: 'image',
                text: text,
                imageUrl: imageUrl,
                time: Date.now()
            };

            selectedConvo.messages.push(msg);
            renderMessages();
        }
        // function renderMessages() {
        //     if (!selectedConvo) {
        //         messagesEl.innerHTML =
        //             '<div class="text-center text-xs text-gray-400">Chọn cuộc trò chuyện để bắt đầu</div>';
        //         return;
        //     }
            
        //     messagesEl.innerHTML = '';
        //     selectedConvo.messages.forEach(m => {
        //         const wrap = document.createElement('div');
        //         wrap.className = m.from === 'me' ? 'flex justify-end' : 'flex justify-start';
        //         const bubble = document.createElement('div');
        //         bubble.className = (m.from === 'me' ? 'bg-indigo-600 text-white' :
        //             'bg-gray-700 text-gray-100') + ' p-3 rounded-lg max-w-[70%] shadow';
        //         bubble.innerHTML =
        //             `<div class="whitespace-pre-wrap">${escapeHtml(m.text)}</div><div class="msg-time mt-1 text-right">${timeAgo(m.time)}</div>`;
        //         wrap.appendChild(bubble);
        //         messagesEl.appendChild(wrap);
        //     });
        //     messagesEl.scrollTop = messagesEl.scrollHeight;
        // }

        function renderMessages() {
            if (!selectedConvo) {
                messagesEl.innerHTML =
                    '<div class="text-center text-xs text-gray-400">Chọn cuộc trò chuyện để bắt đầu</div>';
                return;
            }

            messagesEl.innerHTML = '';

            selectedConvo.messages.forEach(m => {
                const wrap = document.createElement('div');
                wrap.className = m.from === 'me' ? 'flex justify-end' : 'flex justify-start';

                const bubble = document.createElement('div');
                bubble.className =
                    (m.from === 'me'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-100') +
                    ' p-3 rounded-lg max-w-[70%] shadow';

                /* ----------- RENDER THEO TYPE ----------- */
                let content = "";

                // TEXT ---------------------
                if (!m.type || m.type === "text") {
                    content = `
                        <div class="whitespace-pre-wrap">${escapeHtml(m.text)}</div>
                    `;
                }

                // IMAGE ---------------------
                else if (m.type === "image") {
                    content = `
                        <img src="${m.imageUrl}" class="rounded-lg max-h-64 mb-2" />
                        <div>${escapeHtml(m.text || "")}</div>
                    `;
                }

                // VIDEO ---------------------
                else if (m.type === "video") {
                    content = `
                        <div class="mb-2">${escapeHtml(m.text || "")}</div>
                        <video controls class="rounded-lg max-h-64">
                            <source src="${m.videoUrl}" type="video/mp4">
                        </video>
                    `;
                }

                // FILE ---------------------
                else if (m.type === "file") {
                    content = `
                        <a href="${m.fileUrl}" download class="underline text-blue-300">
                            📎 ${escapeHtml(m.text)}
                        </a>
                    `;
                }

                bubble.innerHTML = `
                    ${content}
                    <div class="msg-time mt-1 text-right text-xs opacity-60">${timeAgo(m.time)}</div>
                `;

                wrap.appendChild(bubble);
                messagesEl.appendChild(wrap);
            });

            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
        // function sendAutoVoiceMessage(text, audioUrl) {
        //     if (!selectedConvo) return;

        //     selectedConvo.messages.push({
        //         from: "them",          // DoMini
        //         text: text || "",
        //         audio: audioUrl || "",
        //         time: Date.now()
        //     });

        //     saveConvos();
        //     renderMessages();
        // }
        function sendMessageByDomixi(text){
            const msg = {
                id: 'm' + Math.random().toString(36).slice(2),
                from: 'them',
                text: text || ('[file] ' + file.name),
                time: Date.now()
            };
            selectedConvo.messages.push(msg);
            renderMessages();
        }
        
        function sendAutoVoiceMessage(text, audioUrl) {
            if (!selectedConvo) return alert("Chưa chọn cuộc trò chuyện");

            const msg = {
                id: 'm' + Math.random().toString(36).slice(2),
                from: 'them',
                type: 'voice',      // <-- đánh dấu loại voice
                text: text || "",
                voiceUrl: audioUrl || "",
                time: Date.now()
            };

            selectedConvo.messages.push(msg);
            renderMessages();
        }



        /* ---------- chat send ---------- */
        function sendMessageByOtherPeople(cnt){
            if(cnt == 1){
                setTimeout(() => {
                    sendAutoVideoMessage("", "https://minhdepzzai.github.io/OnlyCode/Video/Mixi.mp4")
                }, 1000); // 2000ms = 2s
                
            }
            else if(cnt == 2){
                setTimeout(() => {
                    sendMessageByDomixi("Oke em, em chuyển khoản cho a luôn nhé")
                    sendMessageByDomixi("MB Bank 123456789")
                }, 1000); // 2000ms = 2s
            }
            else if(cnt == 3){
                sendImageMessage(
                    "",
                    "https://minhdepzzai.github.io/OnlyCode/img/bill.png" 
                )
            }
            else if(cnt == 4){
                setTimeout(() => {
                    sendMessageByDomixi("Có cái pp em nhé, em quê ở đâu thế.")
                }, 1000); // 2000ms = 2s
            }
            else if(cnt == 5){
                 setTimeout(() => {
                    sendMessageByDomixi("Em quê 36 thì mời em vào giao dịch trung gian em nhé.")
                }, 1000); // 2000ms = 2s
            }
            else if(cnt == 7){
                 setTimeout(() => {
                    sendMessageByDomixi("Oke em, tạo box đi")
                    sendMessageByDomixi("")
                }, 1000); // 2000ms = 2s
            }
        }

        const form = document.getElementById('chat-form');
        const msgInput = document.getElementById('msg-input');
        const fileInput = document.getElementById('file-input');
        const attachedFileSpan = document.getElementById('attached-file');

        fileInput.addEventListener('change', () => {
            const f = fileInput.files[0];
            attachedFileSpan.textContent = f ? f.name : '';
        });
        let cnt = 0;
        
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!selectedConvo) {
                alert('Chọn cuộc trò chuyện trước.');
                return;
            }
            const text = msgInput.value.trim();
            const file = fileInput.files[0];
            if (!text && !file) return;
            const msg = {
                id: 'm' + Math.random().toString(36).slice(2),
                from: 'me',
                text: text || ('[file] ' + file.name),
                time: Date.now()
            };
            selectedConvo.messages.push(msg);
            renderMessages();
            // TODO: upload file and send to backend / websocket
            msgInput.value = '';
            fileInput.value = '';
            attachedFileSpan.textContent = '';
            cnt++;
            console.log(cnt);
            sendMessageByOtherPeople(cnt);
            
        });

        // condition To send Mess
        
        

        /* ---------- Escrow flow (demo) ---------- */
        const escrowModal = document.getElementById('escrow-modal');
        const escrowForm = document.getElementById('escrow-form');
        const escrowClose = document.getElementById('escrow-close');
        const escrowCancel = document.getElementById('escrow-cancel');
        const createEscrowBtn = document.getElementById('create-escrow');
        const btnEscrowQuick = document.getElementById('btn-escrow-quick');

        function openEscrowModal() {
            escrowModal.classList.remove('hidden');
            escrowModal.classList.add('flex');
        }

        function closeEscrowModal() {
            escrowModal.classList.add('hidden');
            escrowModal.classList.remove('flex');
        }

        createEscrowBtn.addEventListener('click', () => {
            if (!selectedConvo) {
                alert('Chọn cuộc trò chuyện để tạo giao dịch.');
                return;
            }
            openEscrowModal();
        });
        btnEscrowQuick.addEventListener('click', () => {
            if (!selectedConvo) {
                alert('Chọn cuộc trò chuyện để tạo giao dịch.');
                return;
            }
            // quick prefill
            escrowForm.title.value = 'Thanh toán template';
            escrowForm.desc.value = 'Thanh toán & release khi giao file + xác nhận.';
            escrowForm.amount.value = 99000;
            escrowForm.feePct.value = 5;
            openEscrowModal();
        });
        escrowClose.addEventListener('click', closeEscrowModal);
        escrowCancel.addEventListener('click', closeEscrowModal);
        document.getElementById('escrow-backdrop').addEventListener('click', closeEscrowModal);

        escrowForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!selectedConvo) return;
            const data = Object.fromEntries(new FormData(escrowForm).entries());
            const amount = Number(data.amount) || 0;
            const feePct = Number(data.feePct) || 0;
            const fee = Math.round(amount * feePct / 100);
            const net = amount - fee;
            // create escrow object
            const escrow = {
                id: 'esc_' + Math.random().toString(36).slice(2, 9),
                title: data.title,
                desc: data.desc,
                amount,
                fee,
                net,
                status: 'pending', // pending -> in_escrow -> released -> disputed
                createdAt: Date.now(),
                buyerAccepted: false,
                sellerAccepted: false,
            };
            selectedConvo.escrows.push(escrow);
            // append system message into chat
            selectedConvo.messages.push({
                id: 'm' + Date.now(),
                from: 'system',
                text: `[Escrow created] ${escrow.title} — ${formatCurrency(escrow.amount)} (fee ${formatCurrency(escrow.fee)})`,
                time: Date.now()
            });
            renderMessages();
            renderEscrowPanel();
            closeEscrowModal();

            // TODO: call your backend API to create escrow record, integrate payment (e.g., charge buyer, hold funds in Stripe)
            alert('Escrow demo tạo thành công (client-only). Nên nối backend & payment gateway.');
            escrowForm.reset();
        });

        /* ---------- render escrow panel (top of chat) ---------- */
        function renderEscrowPanel() {
            if (!selectedConvo) {
                escrowPanel.classList.add('hidden');
                return;
            }
            const escrows = selectedConvo.escrows || [];
            if (escrows.length === 0) {
                escrowPanel.classList.add('hidden');
                return;
            }
            escrowPanel.classList.remove('hidden');
            escrowPanel.innerHTML = '';
            escrows.slice().reverse().forEach(e => {
                const el = document.createElement('div');
                el.className =
                    'p-3 rounded bg-gray-900/50 border border-white/5 flex items-start justify-between gap-4';
                el.innerHTML = `
          <div>
            <div class="text-sm font-semibold">${escapeHtml(e.title)} <span class="text-xs text-gray-400">#${e.id}</span></div>
            <div class="text-xs text-gray-400 mt-1">${escapeHtml(e.desc)}</div>
            <div class="text-xs text-gray-400 mt-2">Tổng: <span class="font-medium">${formatCurrency(e.amount)}</span> • Phí: ${formatCurrency(e.fee)} • Người nhận: ${formatCurrency(e.net)}</div>
            <div class="text-xs text-gray-400 mt-1">Trạng thái: <strong class="ml-1">${e.status}</strong></div>
          </div>
          <div class="flex flex-col items-end gap-2">
            ${renderEscrowActionsHtml(e)}
          </div>
        `;
                escrowPanel.appendChild(el);
            });
        }

        function renderEscrowActionsHtml(e) {
            // actions depend on status and who is "you". For demo assume current user is "me" (buyer)
            if (e.status === 'pending') {
                return `<button class="px-3 py-1 rounded bg-emerald-600 text-sm" onclick="acceptEscrow('${e.id}')">Accept & Lock Funds</button>
                <button class="px-3 py-1 rounded bg-white/5 text-sm" onclick="cancelEscrow('${e.id}')">Cancel</button>`;
            } else if (e.status === 'in_escrow') {
                return `<button class="px-3 py-1 rounded bg-indigo-600 text-sm" onclick="releaseEscrow('${e.id}')">Release</button>
                <button class="px-3 py-1 rounded bg-red-600 text-sm" onclick="disputeEscrow('${e.id}')">Raise Dispute</button>`;
            } else if (e.status === 'released') {
                return `<div class="text-xs text-green-300">Released ✓</div>`;
            } else if (e.status === 'disputed') {
                return `<div class="text-xs text-amber-300">Disputed — Admin review</div>`;
            }
            return '';
        }

        // expose functions to global so they can be used in inline onclick (demo)
        window.acceptEscrow = function (id) {
            const e = findEscrowById(id);
            if (!e) return;
            // demo: change status to in_escrow
            e.status = 'in_escrow';
            selectedConvo.messages.push({
                id: 'm' + Date.now(),
                from: 'system',
                text: `[Escrow ${e.id}] Funds locked: ${formatCurrency(e.amount)}`,
                time: Date.now()
            });
            renderMessages();
            renderEscrowPanel();
            // TODO: call backend to actually charge/hold funds via payment gateway
            alert(
                'Demo: funds "locked" (client-only). Ở thực tế: gọi API để charge & hold (Stripe PaymentIntent / Connect).'
                );
        };

        window.cancelEscrow = function (id) {
            const e = findEscrowById(id);
            if (!e) return;
            e.status = 'cancelled';
            selectedConvo.messages.push({
                id: 'm' + Date.now(),
                from: 'system',
                text: `[Escrow ${e.id}] Cancelled`,
                time: Date.now()
            });
            renderMessages();
            renderEscrowPanel();
        };

        window.releaseEscrow = function (id) {
            const e = findEscrowById(id);
            if (!e) return;
            e.status = 'released';
            selectedConvo.messages.push({
                id: 'm' + Date.now(),
                from: 'system',
                text: `[Escrow ${e.id}] Released to seller: ${formatCurrency(e.net)}`,
                time: Date.now()
            });
            renderMessages();
            renderEscrowPanel();
            alert(
                'Demo: funds released (client-only). In production: call backend to transfer to seller (Stripe transfer).'
                );
        };

        window.disputeEscrow = function (id) {
            const e = findEscrowById(id);
            if (!e) return;
            e.status = 'disputed';
            selectedConvo.messages.push({
                id: 'm' + Date.now(),
                from: 'system',
                text: `[Escrow ${e.id}] Dispute raised — admin will review.`,
                time: Date.now()
            });
            renderMessages();
            renderEscrowPanel();
        };

        function findEscrowById(id) {
            return selectedConvo.escrows.find(x => x.id === id);
        }

        /* ---------- Escrow list modal ---------- */
        const escrowListModal = document.getElementById('escrow-list-modal');
        const escrowListBtn = document.getElementById('view-escrows');
        const escrowListClose = document.getElementById('escrow-list-close');
        const escrowListEl = document.getElementById('escrow-list');

        escrowListBtn.addEventListener('click', () => {
            if (!selectedConvo) {
                alert('Chọn cuộc trò chuyện để xem giao dịch.');
                return;
            }
            renderEscrowListModal();
            escrowListModal.classList.remove('hidden');
            escrowListModal.classList.add('flex');
        });
        escrowListClose.addEventListener('click', () => {
            escrowListModal.classList.add('hidden');
            escrowListModal.classList.remove('flex');
        });

        function renderEscrowListModal() {
            escrowListEl.innerHTML = '';
            const esc = selectedConvo.escrows || [];
            if (esc.length === 0) {
                escrowListEl.innerHTML = `<div class="text-sm text-gray-400">Không có giao dịch nào</div>`;
                return;
            }
            esc.forEach(e => {
                const div = document.createElement('div');
                div.className =
                    'p-3 rounded bg-gray-900/50 border border-white/5 flex items-start justify-between';
                div.innerHTML = `
          <div>
            <div class="font-semibold">${escapeHtml(e.title)} <span class="text-xs text-gray-400">#${e.id}</span></div>
            <div class="text-xs text-gray-400 mt-1">${escapeHtml(e.desc)}</div>
            <div class="text-xs text-gray-400 mt-2">Tổng: <strong>${formatCurrency(e.amount)}</strong> • Phí: ${formatCurrency(e.fee)}</div>
            <div class="text-xs text-gray-400 mt-1">Trạng thái: <strong>${e.status}</strong></div>
          </div>
          <div class="flex flex-col gap-2">
            ${renderEscrowActionsHtml(e)}
          </div>
        `;
                escrowListEl.appendChild(div);
            });
        }

        /* ---------- helpers ---------- */
        function escapeHtml(s = '') {
            return String(s).replace(/[&<>"']/g, m => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            } [m]));
        }

        function timeAgo(ts) {
            const diff = Math.floor((Date.now() - ts) / 1000);
            if (diff < 60) return diff + 's';
            if (diff < 3600) return Math.floor(diff / 60) + 'm';
            if (diff < 86400) return Math.floor(diff / 3600) + 'h';
            return new Date(ts).toLocaleString();
        }

        function formatCurrency(n) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(n);
        }

        /* ---------- init ---------- */
        renderConvoList();

        // new chat button (demo create convo)
        document.getElementById('new-chat').addEventListener('click', () => {
            const name = prompt('Tên người (ví dụ: Khách hàng tên X):');
            if (!name) return;
            const c = {
                id: 'c' + Math.random().toString(36).slice(2),
                name,
                last: '',
                online: true,
                messages: [],
                escrows: []
            };
            demoConvos.unshift(c);
            renderConvoList();
            openConvo(c.id);
        });

        // mobile back button
        document.getElementById('back-to-list').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        /* ---------- Notes for integration (copy to your README) ---------- */
        console.log(`
    INTEGRATION NOTES (devs):
    - Replace client-side demo with:
      1) Auth (users & sellers) — e.g., Firebase Auth / OAuth / JWT.
      2) Real-time messaging: WebSocket / Socket.IO / Ably / Pusher.
      3) Escrow / Payments:
         - Buyer pays: create PaymentIntent (Stripe) or charge and place hold.
         - Hold funds (Stripe: capture later / PaymentIntents with capture).
         - Release: call transfer to seller (Stripe Connect) or Payout.
         - For VN local payments, integrate VN PSPs (Momo, VNPay) + reconcile.
      4) Backend endpoints:
         - POST /convos, GET /convos, POST /messages, POST /escrows, POST /escrows/:id/release
      5) Security:
         - Validate file uploads, virus scan, size limits.
         - Enforce authorization on escrow actions.
    `);
    