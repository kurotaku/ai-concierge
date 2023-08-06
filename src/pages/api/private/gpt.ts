import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage } from 'openai';
import { openaiCompletion } from '../../../utils/openai';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const prompts: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: `海外旅行プランを提案してほしいです。
- 国名
- 旅のメインとなる観光スポット
- 宿泊先のホテル
- おすすめの食べ物
は必ず含めてください。

a.滞在日数
b.予算
c.メンバー構成
は最低限考慮したプランにしてください。

こちらのニーズにあったプランになるように、質問を繰り返してほしいです。
質問の選択肢は20文字以内のものを考えてください。
質問と回答を繰り返し、回答事項が増えていくに連れて、提案してくれるプランがブラッシュアップされていくことを期待しています。
プランは必ず3つ以上は毎回提案して下さい。

回答はjson形式でお願いします。ソースコード内で使用するのでjson形式以外ものは含めないでください。
以下はjsonのフォーマットです。
{"question": "質問の内容が入ります。", "choices": {"0": "ひとつ目の選択肢のテキストが入ります"}, {"1": "ふたつ目の選択肢のテキストが入ります"}, "plans": {"0": "ひとつ目のプランのテキストが入ります"}}
`,
    }
  ];

  const messages = req.body.messages.map((data) => {
    return {
      role: data.role,
      content: data.content,
    };
  });

  try {
    const completion = await openaiCompletion(prompts, messages);
    res.status(200).json({
      ...completion.data,
      totalPrompts: { ...prompts.map((prompt) => prompt.content) },
    });
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
