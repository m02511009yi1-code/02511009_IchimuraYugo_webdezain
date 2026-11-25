/* ウェブデザイン 第6回 完成例:作品一覧を API から描画する(works.html で読み込む) */

/* ---- STEP 1 API から取りに行く(fetch) ---- */
fetch("/api/works")
  .then((response) => response.json())   // 届いた文字列を、配列と辞書に変える
  .then((works) => {
    console.log(works);                   // まずコンソールで中身を見る
    showWorks(works);                     // STEP 2 で作る
  })
  .catch((error) => {
    console.error("API から読めません", error);
  });

/* ---- STEP 2 1件ずつカードにして、ul の中に追加する ---- */
function showWorks(works) {
  const list = document.querySelector("#work-list");
  if (works.length === 0) {
    list.innerHTML = "<li>作品はまだありません</li>";
    return;
  }

  // featured が true の作品を先頭に移動し、それ以外の順番はそのまま維持する
  const sortedWorks = [...works].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  sortedWorks.forEach((work) => {
    const li = document.createElement("li");
    li.className = "work-card";

    // 先頭に出す作品には専用クラスを付け、文字のラベルも追加する
    if (work.featured) {
      li.classList.add("work-card-featured");
    }

    const a = document.createElement("a");
    a.href = `work.html?id=${work.id}`;

    const img = document.createElement("img");
    img.src = work.image;
    img.alt = work.alt;

    const h3 = document.createElement("h3");
    h3.textContent = work.title;                       // 文字として入れる

    const p = document.createElement("p");
    p.textContent = `${work.year} / ${work.tools}`;    // 文字として入れる

    if (work.featured) {
      const badge = document.createElement("span");
      badge.className = "featured-badge";
      badge.textContent = "★ 一番見てほしい作品";
      a.append(badge, img, h3, p);
    } else {
      a.append(img, h3, p);
    }

    li.appendChild(a);
    list.appendChild(li);
  });
}
