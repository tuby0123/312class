// feelings_board_script.js

// ⭐️ Supabase 라이브러리를 skypack.dev CDN을 통해 모듈 방식으로 임포트 ⭐️
// 이전에 사용하던 jsdelivr 대신 skypack.dev를 사용합니다.
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// ----------------------------------------------------
// 1. Supabase 클라이언트 초기화 (여기에 위에서 복사한 URL과 Anon Key를 붙여넣으세요!)
// ----------------------------------------------------
const SUPABASE_URL = 'https://piwxdwmjkxdvvxttvsvw.supabase.co'; // 예: 'https://abcdefghijk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpd3hkd21qa3hkdnZ4dHR2c3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNTQ0MjAsImV4cCI6MjA2ODkzMDQyMH0.zm9fmHG6GCbS6pX8vliq8h4Bkpz6r45t8UjKVu_fJro'; // 예: 'eyJhbGciOiJIUzI1Ni...'
// ----------------------------------------------------

// Supabase 클라이언트 초기화를 바로 실행합니다.
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


document.addEventListener('DOMContentLoaded', function() {
    const feelingForm = document.getElementById('feelingForm');
    const authorInput = document.getElementById('author');
    const feelingTextarea = document.getElementById('feeling');
    const feelingsList = document.getElementById('feelingsList');
    const noFeelingsMessage = document.getElementById('noFeelingsMessage');

    // ... (이하 모든 기존 코드 유지) ...

    // 소감을 화면에 표시하는 함수
    async function displayFeelings() {
        const { data: feelings, error } = await supabase
            .from('feelings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching feelings:', error.message);
            alert('소감 데이터를 불러오는 중 오류가 발생했습니다.');
            return;
        }

        feelingsList.innerHTML = '';

        if (feelings.length === 0) {
            noFeelingsMessage.style.display = 'block';
        } else {
            noFeelingsMessage.style.display = 'none';
            feelings.forEach(feeling => {
                const listItem = document.createElement('li');
                listItem.classList.add('feeling-item');
                listItem.dataset.id = feeling.id;

                const date = new Date(feeling.created_at);
                const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

                listItem.innerHTML = `
                    <div class="feeling-meta">
                        <span class="feeling-author">${feeling.author}</span>
                        <span class="feeling-date">${dateString}</span>
                        <button class="delete-button" data-id="${feeling.id}">삭제</button>
                    </div>
                    <p class="feeling-content">${feeling.content}</p>
                `;
                feelingsList.appendChild(listItem);
            });
        }
    }

    // 폼 제출 이벤트 처리
    feelingForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const author = authorInput.value.trim();
        const content = feelingTextarea.value.trim();

        if (author === '' || content === '') {
            alert('이름과 소감을 모두 입력해주세요!');
            return;
        }

        const { data, error } = await supabase
            .from('feelings')
            .insert([
                { author: author, content: content }
            ]);

        if (error) {
            console.error('Error inserting feeling:', error.message);
            alert('소감 등록 중 오류가 발생했습니다.');
            return;
        }

        authorInput.value = '';
        feelingTextarea.value = '';
    });

    // 삭제 버튼 클릭 이벤트 처리 (이벤트 위임 사용)
    feelingsList.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete-button')) {
            const idToDelete = event.target.dataset.id;

            const { error } = await supabase
                .from('feelings')
                .delete()
                .eq('id', idToDelete);

            if (error) {
                console.error('Error deleting feeling:', error.message);
                alert('소감 삭제 중 오류가 발생했습니다.');
                return;
            }

            alert('소감이 삭제되었습니다.');
        }
    });

    // Supabase Realtime 기능 설정
    supabase
        .channel('public:feelings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'feelings' }, payload => {
            console.log('Supabase Realtime Change received!', payload);
            displayFeelings();
        })
        .subscribe();

    // 페이지 로드 시 소감 표시
    displayFeelings();
});
