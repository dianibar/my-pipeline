import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecretValue } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const token = SecretValue.secretsManager("github-token")
    console.log('helllppppppppppp')
    console.log(token)
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('dianibar/my-pipeline', 'main',
        {
				  authentication: token
			  }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
     pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "145427425754", region: "ap-southeast-2" }
    }));
  }
}
