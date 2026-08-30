/* 宦途疾行 · 庆历姓名池 */
const HuantuNames = (() => {
  const SURNAMES = [
    '赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨','朱','秦','尤','许',
    '何','吕','施','张','孔','曹','严','华','金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章',
    '云','苏','潘','葛','奚','范','彭','郎','鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳',
    '鲍','史','唐','费','廉','岑','薛','雷','贺','倪','汤','滕','殷','罗','毕','郝','邬','安','常','乐',
    '于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和','穆','萧','尹','姚'
  ];
  const MALE_GIVEN = [
    '子安','子厚','子明','子修','子由','子瞻','子固','子方','子中','子和',
    '景仁','景初','景温','景文','景山','景元','景纯','景先','景衡','景渊',
    '仲达','仲舒','仲宣','仲卿','仲容','仲仪','仲平','仲甫','仲谋','仲微',
    '伯玉','伯阳','伯纪','伯通','伯庸','伯淳','伯高','伯益','伯远','伯言',
    '彦博','彦国','彦明','彦章','彦升','彦卿','彦和','彦正','彦夫','彦先',
    '君实','君谟','君贶','君锡','君瑞','君平','君佐','君用','君济','君达',
    '公弼','公著','公望','公谨','公辅','公权','公实','公度','公亮','公仪',
    '元之','元礼','元晦','元凯','元辅','元长','元规','元卿','元达','元直',
    '德升','德明','德孚','德裕','德远','德昭','德邻','德修','德威','德温',
    '文正','文忠','文恭','文简','文肃','文定','文靖','文惠','文清','文度'
  ];
  const FEMALE_GIVEN = [
    '若兰','若英','若华','若容','若清','若真','若素','若水','若萱','若筠',
    '静娴','静仪','静徽','静淑','静婉','静宜','静真','静和','静嘉','静宁',
    '令仪','令娴','令淑','令华','令容','令德','令芳','令章','令音','令徽',
    '惠兰','惠娘','惠心','惠宁','惠真','惠和','惠卿','惠容','惠仪','惠芳',
    '淑真','淑仪','淑慎','淑媛','淑华','淑容','淑英','淑清','淑宁','淑婉',
    '清照','清婉','清芬','清容','清仪','清宁','清华','清韵','清月','清漪',
    '兰心','兰芝','兰英','兰若','兰卿','兰仪','兰玉','兰芳','兰雪','兰蕙',
    '玉娘','玉英','玉华','玉真','玉容','玉清','玉仪','玉卿','玉瑛','玉徽',
    '婉仪','婉容','婉真','婉宁','婉清','婉华','婉卿','婉若','婉德','婉音',
    '明月','明玉','明霞','明心','明慧','明真','明淑','明仪','明珠','明远'
  ];

  function buildPool() {
    const names = [];
    for (const given of MALE_GIVEN) {
      for (const surname of SURNAMES) {
        names.push(surname + given);
        if (names.length >= 500) break;
      }
      if (names.length >= 500) break;
    }
    for (const given of FEMALE_GIVEN) {
      for (const surname of SURNAMES) {
        names.push(surname + given);
        if (names.length >= 1000) break;
      }
      if (names.length >= 1000) break;
    }
    return names;
  }

  const POOL = buildPool();

  function normalize(name) {
    return String(name || '').normalize('NFKC').replace(/\s+/g, '').trim().toLowerCase();
  }

  function random(used = []) {
    const usedSet = new Set(used.map(normalize));
    const pool = POOL.filter((name) => !usedSet.has(normalize(name)));
    const source = pool.length ? pool : POOL;
    return source[Math.floor(Math.random() * source.length)] || '沈砚青';
  }

  function lengthUnits(name) {
    let units = 0;
    for (const ch of String(name || '').trim()) {
      units += /[\x00-\x7F]/.test(ch) ? 0.5 : 1;
    }
    return units;
  }

  function validate(name) {
    const s = String(name || '').normalize('NFKC').replace(/\s+/g, '').trim();
    if (!s) return { ok: false, message: '请先填写姓名' };
    if (lengthUnits(s) > 6) return { ok: false, message: '姓名过长，请控制在六个中文长度以内' };
    return { ok: true, name: s };
  }

  return { POOL, random, normalize, validate, lengthUnits };
})();
