/* 宦途疾行 · 典故图鉴配图与提示词 */
const HuanTuCodexArt = (() => {
  const STYLE_TEMPLATE = [
    '宋代中国画风，北宋院体小品画与文人水墨结合',
    '绢本设色，淡墨皴法，赭石、石青、石绿与朱砂点染',
    '细线人物、留白、远山薄雾、案牍与宫廷器物准确',
    '群像人物需有不同年龄、脸型、眉眼、胡须、神态与服饰层级，避免同一张脸重复',
    '画面雅致克制，非现代插画，非卡通，非厚涂，非摄影'
  ].join('，');

  const PROMPT_TEMPLATE = [
    '主题：《{name}》',
    '场景：{scene}',
    '画风：{style}',
    '构图：横幅小品，前景有人物或器物，中景为廊庑、官署、边塞或乡野，远景留白见山水云气',
    '人物：画风保持一致，但人物相貌不可复制；群像中每个人应有可辨认的年龄、身份、脸型与表情差异',
    '色调：{palette}',
    '文字：不要生成现代文字，不要水印，不要题字；只保留画面意象',
    '比例：16:9'
  ].join('\n');

  const TRACK_LABEL = {
    benguan: '本官仕途',
    sanjie: '散阶章服',
    xun: '边功勋劳',
    jue: '封爵恩典'
  };

  const PALETTE = {
    red: '暖赭、朱砂、淡金与石青，气象明朗',
    blue: '冷灰、淡墨、青绿与残朱，气象低回'
  };

  const GENERATED_IMAGES = (typeof window !== 'undefined' && window.HUANTU_CODEX_IMAGES) || {};

  const SCENES = {
    qingli_zou: '范仲淹于烛下展卷上疏，案头堆着边图与奏札，窗外汴梁夜雨微明。',
    fan_ju: '馆阁名臣执笔荐士，年轻士子敛衣受教，屏风后可见书卷与香炉。',
    kaoji: '吏部院中考功案牍层叠，小吏捧册唱名，一名官员神色从容受优等批注。',
    chishu: '中书门下宣读敕书，黄绢诏命垂于案前，受官者肃立听命。',
    jinyu: '朝堂阶前新赐金鱼袋，绯紫章服微动，金饰在柔光中一点生辉。',
    guanfu: '内侍捧来新赐服色，官员在屏前试披章服，旁有礼官核验品秩。',
    jungong: '边城捷报入营，旗帜猎猎，武臣在沙盘前指点新破敌阵。',
    zhucheng: '西北堡寨正在修筑，军士搬石筑城，帅臣持令牌登高督工。',
    cefeng: '宫阙前宣读册封恩诏，朱漆案上置玉册，远处门第灯火初上。',
    kaiguo: '簪缨世家受开国封赏，庭中列鼎与族谱相映，门楣悬灯。',
    shoujiu: '老臣于竹林书斋批阅疏章，清流士人围坐论礼，气象端严。',
    fuyao: '御笔特旨自宫中传出，朱印新鲜，受擢者仰望云开日出。',
    enshi: '座师夜读门生文章，案边一封荐疏将成，窗下梅影清瘦。',
    yudui: '殿上御前对策，士子持笏陈辞，天子隔帘听奏，群臣静立。',
    tietang: '秘阁中贴黄进呈，校书郎伏案校勘，书架与卷轴如林。',
    gaoshi: '新告身告敕铺展在案，章带服色整齐陈列，官员低首谢恩。',
    enqi: '祖宗功荫文书开封，家庙香烟缭绕，少年袭爵者立于庭中。',
    bianbao: '边帅军府开报战功，告身与军功册并陈，帐外可见烽燧。',
    baxin: '台谏官在殿廊递上弹章，远处朝臣低声议论，新法文书半卷。',
    wutai: '乌台深院阴雨，案上诗卷被朱笔圈点，孤灯照见审案官影。',
    jiansi: '监司按行州县，驿亭外吏民肃立，案上摆着失政簿册。',
    bianbai: '边报败绩传至枢府，残旗与断矛置于阶下，官员神色凝重。',
    duojue: '夺爵诏下，旧日玉册被收入匣中，门庭灯火转暗。',
    bianzhe: '岭南瘴雨中远贬官员独行，驿路芭蕉低垂，天色潮湿。',
    zuoqian: '远州驿路暮色，一纸左迁文书随行囊同行，孤舟泊于江边。',
    pengdang: '朝堂上朋党之论纷起，名籍摊开，几名士人相对沉默。',
    taishu: '御史台疏章连上，朱笔批注醒目，台阶外风吹乌纱。',
    zhuigao: '诰命被追回入库，红绫封套合上，旧荣光如残烛将熄。',
    xuejie: '散阶服色被收回，官员褪下章带，空庭中只余冷风。',
    zhuizheng: '旧案卷宗重新开启，尘封文书在案上铺开，烛火摇晃。',
    mingjie: '士林清议汹汹，街巷邸报传看，主人公独立书斋前。',
    junfa: '军帐中军法议罪，令箭置案，帐外士卒列队肃然。',
    yiji: '驿卒飞马递送急文，官员披衣夜起，案上灯火未灭。',
    yuxi: '边庭羽檄至营，军使捧檄入帐，远处烽火照雪岭。',
    jieyin: '捷音入朝，宫门前驿使献上捷报，群臣面露喜色。',
    shoubian: '戍边老卒与守臣在寒城记劳，雪落甲衣，功簿摊开。',
    zhengbai: '阵前大捷后旌旗归营，俘获器械陈列，帅臣执笔奏闻。',
    shiqing: '军期已误，沙漏倾尽，军吏在帐中勘责迟到文书。',
    lizhen: '临阵退却后军旗低垂，军法官立于帐前，败兵垂首。',
    tiequan: '铁券置于漆案，金石铭文泛光，家臣与受赐者肃拜。',
    jinfeng: '晋爵恩赏宣下，宫庭花影中玉册再开，门第光彩更盛。',
    xijue: '袭爵文书在宗祠前宣读，祖先画像与香案相映。',
    shiyi: '食邑加赋文书送至府第，田畴与粮仓远远相连。',
    fanming: '封爵犯名被礼官纠举，册页上朱圈醒目，官员惊惧退立。',
    xueti: '削邑夺俸后府库清点，钱粮册被合上，庭院秋色萧疏。',
    chaofu: '朝服晋献于殿前，礼官捧服，阶下云气与宫灯交映。',
    zhengji: '地方政绩上闻，百姓在桥边致谢，官员案上有加阶诏书。',
    chaozheng: '殿上朝争失仪，笏板错落，御史侧目记录。',
    fuwei: '僭越服色被礼官指出，华服与制度图册并置，气氛尴尬。',
    dingyou: '丁忧归乡，官员素服行于水边小路，远处家门竹影清寒。',
    chaobai: '邸报在茶坊传阅，士人围桌低语，纸上隐约见名姓。',
    pingdiao: '平调文书送至边任，官员整理行装，驿马立于门外。',
    fengshang: '吏部岁终封赏，钱袋与朱印账册置案，灯下金色微明。',
    yinpiao: '交子银票在市肆中递换，商贾柜台、官人袖手而立。',
    changsheng: '月俸常例入账，书吏拨算盘，官员在窗下记俸。',
    shangci: '御赐赏钱由内侍捧出，漆盘覆红绫，受赏者拱手谢恩。',
    junxiang: '边庭犒赏分发军饷，军士列队，帐前钱袋与酒坛并陈。',
    tianzi: '职田租课折银入账，田畴水渠与府中账簿相接。',
    huishang: '会试旧赏赉从箱中取出，书生旧卷与银钱同置案上。',
    jungonglu: '军功录摊在帅府案前，朱笔记功，帐外旗影摇动。',
    kaogong: '考功格册页整齐展开，吏部官员以朱笔评定等第。',
    zoujie: '奏捷文书快马送入宫城，晨雾中宫门将启。',
    yinzhi: '荫职功状在家族书案上展开，祖先画像俯视后人。',
    xunlao: '勋劳簿按月添记，官员在灯下翻阅积劳册。',
    qingming: '清名碑立于水边书院，士人驻足观碑，松风淡淡。'
  };

  function text(value, fallback = '') {
    const s = String(value == null ? '' : value).trim();
    return s || fallback;
  }

  function shortDetail(entry) {
    const brief = text(entry.brief, entry.name);
    const detail = text(entry.detail, brief);
    return `${brief}。${detail}`;
  }

  function palette(entry) {
    return PALETTE[entry.color] || '淡墨、赭石、石青与温润纸色，气象雅正';
  }

  function category(entry) {
    if (entry.coinValue) return '封赏钱谷';
    if (entry.meritValue) return '功劳簿册';
    return TRACK_LABEL[entry.track] || '宦途典故';
  }

  function sceneFor(entry) {
    return SCENES[entry.id] || `${entry.name}所指典故化为宋代官场一幕：${text(entry.detail, entry.brief)}`;
  }

  function promptFor(entry) {
    return PROMPT_TEMPLATE
      .replace('{name}', text(entry.name, '典故'))
      .replace('{scene}', sceneFor(entry))
      .replace('{style}', STYLE_TEMPLATE)
      .replace('{palette}', palette(entry));
  }

  function get(entry) {
    return {
      id: entry.id,
      category: category(entry),
      caption: shortDetail(entry),
      scene: sceneFor(entry),
      prompt: promptFor(entry),
      image: GENERATED_IMAGES[entry.id] || '',
      palette: palette(entry),
      template: PROMPT_TEMPLATE
    };
  }

  function all(entries) {
    return (entries || []).map(get);
  }

  return {
    all,
    get,
    styleTemplate: STYLE_TEMPLATE,
    promptTemplate: PROMPT_TEMPLATE
  };
})();
